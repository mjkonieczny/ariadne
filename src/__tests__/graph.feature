Feature: Graph

  Scenario Outline:  deserialize <graphName> graph
    Given undirected <graphName> graph
    Then should have <v> vertices
    And should have <e> edges
    And adjacent of vertex 4 should be <adjacent>

    Examples:
      | graphName | v  | e  | adjacent |
      | "tinyG"   | 13 | 14 | 3,5,6    |
      | "tinyEWG" | 8  | 16 | 0,5,6,7  |

  Scenario Outline: first paths
    Given undirected <graphName> graph
    When <iterator> first paths from <source>
    Then should has path to <target> is <hasPath>
    And path to <target> should be <path>

    Examples:
      | graphName | iterator  | source | target | hasPath | path      |
      | "tinyG"   | "breadth" | 1      | 2      | true    | 1,0,2     |
      | "tinyG"   | "breadth" | 2      | 3      | true    | 2,0,5,3   |
      | "tinyG"   | "breadth" | 2      | 7      | false   | null      |
      | "tinyG"   | "depth"   | 1      | 2      | true    | 1,0,2     |
      | "tinyG"   | "depth"   | 2      | 3      | true    | 2,0,5,4,3 |
      | "tinyG"   | "depth"   | 2      | 7      | false   | null      |