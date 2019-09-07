Feature: Graph

  Scenario Outline:  deserialize <graphName> graph
    Given undirected <graphName> graph
    Then should have <v> vertices
    And should have <e> edges
    And adjacent of vertex 4 should be <adj>

    Examples:
      | graphName | v  | e  | adj     |
      | 'tinyG'   | 13 | 14 | 3,5,6   |
      | 'tinyEWG' | 8  | 16 | 0,5,6,7 |
