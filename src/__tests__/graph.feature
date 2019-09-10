Feature: Graph

  Scenario Outline:  deserialize <graphName> graph
    Given undirected <graphName> graph
    Then should have <v> vertices
    And should have <e> edges
    And adjacent of vertex 4 should be <adj>

    Examples:
      | graphName | v  | e  | adj     |
      | "tinyG"   | 13 | 14 | 3,5,6   |
      | "tinyEWG" | 8  | 16 | 0,5,6,7 |

  Scenario Outline: first paths
    Given undirected <graphName> graph
    When <iterator> first paths from <s>
    Then should has path to <t> is <hasPath>

    Examples:
      | graphName | iterator  | s | t | hasPath |
      | "tinyG"   | "breadth" | 1 | 2 | true    |
      | "tinyG"   | "breadth" | 2 | 3 | true    |
      | "tinyG"   | "breadth" | 2 | 7 | false   |
      | "tinyG"   | "depth"   | 1 | 2 | true    |
      | "tinyG"   | "depth"   | 2 | 3 | true    |
      | "tinyG"   | "depth"   | 2 | 7 | false   |