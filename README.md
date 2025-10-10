# Ant Colony Optimization for Payment Routing in Blockchain Networks

## Introduction

This project explores the application of Ant Colony Optimization (ACO) for payment routing in decentralized networks. The work is heavily inspired by the "Ant Routing" model proposed in the scientific paper "Ant Routing scalability for the Lightning Network" by Cyril Grunspan, Gabriel Lehéricy, and Ricardo Pérez-Marco.

During the study of the Lightning Network, this approach drew significant attention due to its decentralized and adaptive nature, which aligns perfectly with the core principles of blockchain technologies. This repository contains a web-based visualization and a conceptual Python implementation to explore and demonstrate this concept.

-----

## The Routing Problem in the Lightning Network

The Lightning Network is a second-layer protocol designed to enable fast and cheap transactions. When a user wants to send a payment to a recipient without a direct payment channel, the network must find a path through a series of intermediaries.

Finding the optimal path is a complex task because it must satisfy several criteria simultaneously:

  * **Low Fees**: Each intermediary node charges a small fee. The total fee for the path should be minimized.
  * **Sufficient Liquidity**: Every channel along the path must have enough funds to process the payment.
  * **Reliability**: The nodes on the path must be online and operational.

This problem is further complicated by the network's highly dynamic state, where fees and channel liquidity change constantly.

-----

## Applying Ant Colony Optimization (ACO)

The ACO algorithm provides an elegant, decentralized model for this challenge. We can draw the following analogy:

  * **Cities** ↔️ **Nodes** in the Lightning Network.
  * **Paths between cities** ↔️ **Payment channels** between nodes.
  * **Ants** ↔️ **Virtual "probe" packets**. These are tiny, near-zero-cost data packets that explore the network to find good routes.
  * **Path distance** ↔️ **Route cost** (a combination of fees, time, and liquidity).
  * **Pheromones** ↔️ **Channel reputation**. A channel that was recently part of a successful, cheap, and fast payment gets a strong "pheromone trail," indicating it's a high-quality route.

-----

## The Step-by-Step Process

When a node (Alice) wants to find the best path to another node (Dave), the process unfolds as follows:

1.  **Exploration**: Alice's node sends out multiple "ant" probe packets towards Dave.
2.  **Path Selection**: At each intermediary node, the "ant" probabilistically chooses the next channel based on two factors:
      * **Pheromone Trail (α)**: The historical success and quality of a channel.
      * **Heuristic Information (β)**: The immediate attractiveness of a channel (low fees, high liquidity).
3.  **Pheromone Update**: When a probe reaches Dave, it reports its total path cost. It then travels back along the same path, depositing a "pheromone" trail. **The lower the cost, the stronger the pheromone trail.**
4.  **Evaporation**: Over time, all pheromone trails slowly evaporate. This crucial step allows the network to "forget" old routes that may no longer be optimal, forcing ants to continuously explore and adapt to the current network state.
5.  **Payment Execution**: After the probes return, Alice's node analyzes the fresh pheromone map. The path with the strongest trail is identified as the most optimal route at that moment, and the actual payment is sent along it.

-----

## Advantages of the ACO Approach 🐜⚡️

  * **Decentralization**: Fits the blockchain ethos perfectly, as there is no central server managing routes. Each node makes local decisions.
  * **Adaptability**: The system dynamically adapts to changes in network fees, liquidity, and topology through the mechanisms of pheromone updates and evaporation.
  * **Load Balancing**: The probabilistic nature of the algorithm naturally distributes payment traffic across multiple viable routes, preventing congestion on a single "best" path.
  * **Multi-Objective Optimization**: The "cost" function can be designed to balance multiple objectives (e.g., minimizing fees while maximizing reliability) simultaneously.

-----

## Project Components

This repository contains two key components created to demonstrate this algorithm.

### 1\. Interactive Web Visualization (TSP Demo)

**[➡️ Live Demo](https://www.google.com/search?q=http://127.0.0.1:5500/index.html)** *(Замените эту ссылку на реальную после публикации)*

This project includes an interactive, web-based tool built with **HTML, CSS, and JavaScript**.

**Important Note:** This visualization demonstrates the Ant Colony Optimization algorithm by solving the classic **Traveling Salesperson Problem (TSP)**. Its purpose is to provide a clear and intuitive visual understanding of the core mechanics of ACO (how ants explore, leave pheromones, and converge on an optimal solution).

While the actual implementation for the Lightning Network requires a different approach (finding a single path from start to end, using fees/liquidity as cost), this TSP demo serves as an excellent **foundational analogy** to grasp the algorithm's behavior before applying it to the more complex network routing problem.

### 2\. Conceptual Python Implementation for Lightning Routing

This Python script is a **conceptual adaptation** of the ACO algorithm specifically for a Lightning-like payment network. It moves beyond the TSP analogy to a model that finds the cheapest path from a single sender to a single receiver, considering factors like channel fees and liquidity. This code serves as an architectural template for a real-world implementation.

```python
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
        """
        self._initialize_pheromones()

        for iteration in range(self.iterations):
            all_paths = []
            for _ in range(self.num_ants):
                path, total_fee = self._construct_path(start_node, end_node, payment_amount)
                
                if path:
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
        
        max_path_length = len(self.graph.get_all_nodes())

        while current_node != end_node and len(path) < max_path_length:
            next_channel = self._select_next_channel(current_node, path, payment_amount)
            
            if next_channel is None:
                return None, float('inf')
                
            total_fee += next_channel.calculate_fee(payment_amount)
            current_node = next_channel.destination
            path.append(current_node)
        
        if current_node == end_node:
            return path, total_fee
        else:
            return None, float('inf')

    def _select_next_channel(self, current_node, visited_nodes, payment_amount):
        """Selects the next channel for an ant based on pheromones and heuristics."""
        probabilities = []
        total_prob = 0.0

        for channel in self.graph.get_outgoing_channels(current_node):
            next_node = channel.destination
            
            if next_node not in visited_nodes and channel.liquidity >= payment_amount:
                fee = channel.calculate_fee(payment_amount)
                heuristic = (1.0 / (fee + 1e-9)) ** self.beta
                
                pheromone_level = self.pheromones.get((current_node, next_node), 1.0)
                pheromone = pheromone_level ** self.alpha
                
                prob = pheromone * heuristic
                probabilities.append((channel, prob))
                total_prob += prob

        if total_prob == 0:
            return None

        probabilities = [(channel, prob / total_prob) for channel, prob in probabilities]
        
        r = random.uniform(0, 1)
        cumulative_prob = 0.0
        for channel, prob in probabilities:
            cumulative_prob += prob
            if r <= cumulative_prob:
                return channel
        
        return probabilities[-1][0]

    def _update_pheromones(self, all_paths):
        """Evaporates old pheromones and deposits new ones based on successful paths."""
        for edge in self.pheromones:
            self.pheromones[edge] *= (1 - self.evaporation_rate)

        for path, total_fee in all_paths:
            pheromone_deposit = self.Q / total_fee
            
            for i in range(len(path) - 1):
                source_node = path[i]
                dest_node = path[i+1]
                
                current_pheromone = self.pheromones.get((source_node, dest_node), 0)
                self.pheromones[(source_node, dest_node)] = current_pheromone + pheromone_deposit

# --- Mock Data Structures for Demonstration ---

class MockChannel:
    def __init__(self, source, destination, liquidity, base_fee, fee_rate):
        self.source = source
        self.destination = destination
        self.liquidity = liquidity
        self.base_fee = base_fee
        self.fee_rate = fee_rate

    def calculate_fee(self, amount):
        return self.base_fee + (amount * self.fee_rate)

class MockNetworkGraph:
    def __init__(self):
        self.nodes = set()
        self.channels = {}

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
    network = MockNetworkGraph()
    network.add_channel('A', 'B', liquidity=1000, base_fee=1, fee_rate=0.001)
    network.add_channel('B', 'D', liquidity=1000, base_fee=1, fee_rate=0.001)
    network.add_channel('A', 'C', liquidity=1000, base_fee=5, fee_rate=0.005)
    network.add_channel('C', 'D', liquidity=1000, base_fee=5, fee_rate=0.005)
    network.add_channel('B', 'C', liquidity=500, base_fee=1, fee_rate=0.001)

    ACO_PARAMS = {
        "num_ants": 20, "iterations": 50, "alpha": 1.0, 
        "beta": 2.0, "evap_rate": 0.5
    }

    start, end, amount = 'A', 'D', 100

    print(f"Finding path from {start} to {end} for amount {amount}...")
    aco_solver = LightningACO(network, **ACO_PARAMS)
    best_path, best_fee = aco_solver.solve(start, end, amount)

    print("\n--- ACO Simulation Finished ---")
    if best_path:
        print(f"Best path found: {' -> '.join(best_path)}")
        print(f"Total fee for this path: {best_fee:.4f}")
    else:
        print("No path found.")
```

-----

## Acknowledgements and References

The conceptual model for applying ACO to the Lightning Network described in this repository is based on the research presented in the following scientific preprint. This paper served as the primary source of inspiration and theoretical foundation for the project.

  - **Title:** Ant Routing scalability for the Lightning Network
  - **Authors:** Cyril Grunspan, Gabriel Lehéricy, Ricardo Pérez-Marco
  - **Year:** 2020
  - **HAL Id:** `hal-02467123`
  - **Link:** [https://hal.science/hal-02467123](https://hal.science/hal-02467123/document)

-----

## Conclusion

Ant Colony Optimization presents a highly promising model for payment routing in decentralized networks like Lightning. Its inherent ability to adapt to dynamic conditions and make decisions without a central authority makes it a natural fit for the blockchain ecosystem.

This repository demonstrates the feasibility of this approach through two complementary components:

1.  A **visual, intuitive demonstration** of the core ACO principles using a classic problem.
2.  A **conceptual, domain-specific implementation** in Python that serves as a blueprint for a real-world application.

Together, they provide a comprehensive overview of how the emergent intelligence of an ant colony can be harnessed to solve complex, real-world routing challenges, building upon the foundational ideas presented by researchers in the field.