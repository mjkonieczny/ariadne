Feature: Graph

  Scenario: deserialize graph
    Given undirected graph
    Then should have 13 vertices
    And should have 13 edges
    And vertex 4 should have 3 edges
  