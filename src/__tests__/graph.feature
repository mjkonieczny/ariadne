Feature: Graph

  Scenario:
    Given undirected graph
    When I add vertex 1
    Then should be 1 vertices
  
  Scenario:
    Given undirected graph
    And I add vertex 1
    And I add vertex 2
    When I add edge 1 from 1 to 2
    Then vertex 1 should have 1 edges