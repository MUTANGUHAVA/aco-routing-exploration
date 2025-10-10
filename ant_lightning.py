import random
import math

class LightningACO:
    """
    A conceptual model for solving payment routing in a Lightning-like network
    using Ant Colony Optimization.
    """
    
    def __init__(self, network_graph, num_ants, iterations, alpha, beta, evap_rate, Q=100):
        """
        Initializes the Lightning Network ACO Solver.

        Args:
            network_graph (object): An object representing the network topology,
                                    providing methods to get nodes and channels.
            num_ants (int): The number of "probe" ants to send out in each iteration.
            iterations (int): The number of iterations to run the algorithm.
            alpha (float): The influence of the pheromone trail.
            beta (float): The influence of the heuristic information (fees/liquidity).
            evap_rate (float): The rate at which pheromones evaporate (0 to 1).
            Q (int): A constant for pheromone deposit calculation.
        """
        self.graph = network_graph
        self.num_ants = num_ants
        self.iterations = iterations
        self.alpha = alpha
        self.beta = beta
        self.evaporation_rate = evap_rate
        self.Q = Q

        # Pheromones are stored on directed edges (channels) between nodes.
        # We can use a dictionary for a sparse graph representation.
        self.pheromones = {} # e.g., {('nodeA', 'nodeB'): 1.0, ...}
        
        self.best_path = None
        self.best_path_fee = float('inf')

    def _initialize_pheromones(self):
        """Initializes pheromone levels on all known channels."""
        for node in self.graph.get_all_nodes():
            for channel in self.graph.get_outgoing_channels(node):
                self.pheromones[(channel.source, channel.destination)] = 1.0

    def solve(self, start_node, end_node, payment_amount):
        """
        Finds the optimal path from a start to an end node for a given amount.

        Args:
            start_node (str): The ID of the starting node.
            end_node (str): The ID of the destination node.
            payment_amount (float): The amount of the payment to be routed.
        
        Returns:
            A tuple containing the best path (list of node IDs) and its total fee.
        """
        self._initialize_pheromones()

        for iteration in range(self.iterations):
            all_paths = []
            for _ in range(self.num_ants):
                # An ant constructs a path from the start to the end node
                path, total_fee = self._construct_path(start_node, end_node, payment_amount)
                
                if path:  # A valid path was found
                    all_paths.append((path, total_fee))
                    if total_fee < self.best_path_fee:
                        self.best_path = path
                        self.best_path_fee = total_fee
            
            self._update_pheromones(all_paths)
            print(f"Iteration {iteration + 1}/{self.iterations}, Best Fee Found: {self.best_path_fee:.4f}")
        
        return self.best_path, self.best_path_fee

    def _construct_path(self, start_node, end_node, payment_amount):
        """Constructs a single path for one ant."""
        path = [start_node]
        current_node = start_node
        total_fee = 0
        
        # Limit path length to avoid infinite loops in case of cycles
        max_path_length = len(self.graph.get_all_nodes())

        while current_node != end_node and len(path) < max_path_length:
            next_channel = self._select_next_channel(current_node, path, payment_amount)
            
            if next_channel is None:
                return None, float('inf') # Ant is stuck, no valid path
                
            total_fee += next_channel.calculate_fee(payment_amount)
            current_node = next_channel.destination
            path.append(current_node)
        
        if current_node == end_node:
            return path, total_fee
        else:
            return None, float('inf') # Path not found

    def _select_next_channel(self, current_node, visited_nodes, payment_amount):
        """Selects the next channel for an ant based on pheromones and heuristics."""
        probabilities = []
        total_prob = 0.0

        # Iterate through all outgoing channels from the current node
        for channel in self.graph.get_outgoing_channels(current_node):
            next_node = channel.destination
            
            # Ant checks if the next node has been visited and if the channel has enough liquidity
            if next_node not in visited_nodes and channel.liquidity >= payment_amount:
                
                # Heuristic: The "attractiveness" of a channel.
                # A lower fee means a higher heuristic value.
                # Adding a small epsilon to avoid division by zero for free channels.
                fee = channel.calculate_fee(payment_amount)
                heuristic = (1.0 / (fee + 1e-9)) ** self.beta
                
                # Get the pheromone level for this directed edge
                pheromone_level = self.pheromones.get((current_node, next_node), 1.0)
                pheromone = pheromone_level ** self.alpha
                
                prob = pheromone * heuristic
                probabilities.append((channel, prob))
                total_prob += prob

        if total_prob == 0:
            return None # No valid channels found

        # Normalize probabilities
        probabilities = [(channel, prob / total_prob) for channel, prob in probabilities]
        
        # Roulette wheel selection
        r = random.uniform(0, 1)
        cumulative_prob = 0.0
        for channel, prob in probabilities:
            cumulative_prob += prob
            if r <= cumulative_prob:
                return channel
        
        return probabilities[-1][0] # Fallback

    def _update_pheromones(self, all_paths):
        """Evaporates old pheromones and deposits new ones based on successful paths."""
        # 1. Evaporation
        for edge in self.pheromones:
            self.pheromones[edge] *= (1 - self.evaporation_rate)

        # 2. Deposition
        for path, total_fee in all_paths:
            # A lower total fee results in a higher pheromone deposit
            pheromone_deposit = self.Q / total_fee
            
            for i in range(len(path) - 1):
                source_node = path[i]
                dest_node = path[i+1]
                
                # Update the pheromone on the directed edge
                current_pheromone = self.pheromones.get((source_node, dest_node), 0)
                self.pheromones[(source_node, dest_node)] = current_pheromone + pheromone_deposit

# --- Mock Data Structures for Demonstration ---

class MockChannel:
    """A mock representation of a Lightning payment channel."""
    def __init__(self, source, destination, liquidity, base_fee, fee_rate):
        self.source = source
        self.destination = destination
        self.liquidity = liquidity
        self.base_fee = base_fee
        self.fee_rate = fee_rate # Proportional fee (e.g., 0.001 for 0.1%)

    def calculate_fee(self, amount):
        return self.base_fee + (amount * self.fee_rate)

class MockNetworkGraph:
    """A mock representation of the network graph."""
    def __init__(self):
        self.nodes = set()
        self.channels = {} # Key: source_node, Value: list of Channel objects

    def add_channel(self, source, dest, liquidity, base_fee, fee_rate):
        self.nodes.add(source)
        self.nodes.add(dest)
        if source not in self.channels:
            self.channels[source] = []
        
        channel = MockChannel(source, dest, liquidity, base_fee, fee_rate)
        self.channels[source].append(channel)

    def get_all_nodes(self):
        return list(self.nodes)

    def get_outgoing_channels(self, source_node):
        return self.channels.get(source_node, [])

# --- Example Usage ---

if __name__ == '__main__':
    # 1. Create a mock network
    network = MockNetworkGraph()
    # Path: A -> B -> D
    network.add_channel('A', 'B', liquidity=1000, base_fee=1, fee_rate=0.001)
    network.add_channel('B', 'D', liquidity=1000, base_fee=1, fee_rate=0.001)
    # Path: A -> C -> D (more expensive)
    network.add_channel('A', 'C', liquidity=1000, base_fee=5, fee_rate=0.005)
    network.add_channel('C', 'D', liquidity=1000, base_fee=5, fee_rate=0.005)
    # A decoy path
    network.add_channel('B', 'C', liquidity=500, base_fee=1, fee_rate=0.001)

    # 2. Define ACO parameters
    ACO_PARAMS = {
        "num_ants": 20,
        "iterations": 50,
        "alpha": 1.0,           # Pheromone influence
        "beta": 2.0,            # Heuristic influence
        "evap_rate": 0.5        # Evaporation rate
    }

    # 3. Define the routing task
    start = 'A'
    end = 'D'
    amount = 100

    print(f"Finding path from {start} to {end} for amount {amount}...")
    
    # 4. Create solver and run
    aco_solver = LightningACO(network, **ACO_PARAMS)
    best_path, best_fee = aco_solver.solve(start, end, amount)

    print("\n--- ACO Simulation Finished ---")
    if best_path:
        print(f"Best path found: {' -> '.join(best_path)}")
        print(f"Total fee for this path: {best_fee:.4f}")
    else:
        print("No path found.")