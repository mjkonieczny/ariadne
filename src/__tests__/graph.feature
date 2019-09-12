Feature: Graph

  Scenario Outline:  deserialize <graphName> graph
    Given <graphName> graph
    Then should have <v> vertices
    And should have <e> edges
    And adjacent of vertex 4 should be <adjacent>

    Examples:
      | graphName | v  | e  | adjacent |
      | "tinyG"   | 13 | 13 | 3,5,6    |
      | "tinyEWG" | 8  | 16 | 0,5,6,7  |

  Scenario Outline: <graphName> <iterator> first paths from <source> to <target>
    Given <graphName> graph
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
      | "tinyDG"  | "breadth" | 2      | 1      | true    | 2,0,1     |
      | "tinyDG"  | "breadth" | 0      | 3      | true    | 0,5,4,3   |
      | "tinyDG"  | "breadth" | 2      | 7      | false   | null      |
      | "tinyDG"  | "depth"   | 2      | 1      | true    | 2,0,1     |
      | "tinyDG"  | "depth"   | 0      | 3      | true    | 0,5,4,2,3 |
      | "tinyDG"  | "depth"   | 2      | 7      | false   | null      |

  Scenario Outline: degree of separation between <source> and <target>
    Given <graphName> graph
    Then degree of separation between <source> and <target> is <degreeOfSeparation>

    Examples:
      | graphName | source | target | degreeOfSeparation |
      | "tinyG"   | 1      | 2      | 2                  |
      | "tinyG"   | 2      | 3      | 3                  |
      | "tinyG"   | 3      | 12     | -1                 |
      | "tinyDG"  | 0      | 12     | -1                 |
      | "tinyDG"  | 12     | 0      | 5                  |
      | "tinyDG"  | 8      | 1      | 3                  |

  Scenario: depth first order
    Given "tinyDGnc" graph
    When depth first order
    Then "pre" order is 0,1,5,4,2,3,6,9,12,10,11,7,8
    And "post" order is 1,4,5,0,3,2,12,10,11,9,6,7,8
    And "reversePost" order is 8,7,6,9,11,10,12,2,3,0,5,4,1

  Scenario Outline: <graphName> topological
    Given <graphName> graph
    When topological
    Then is dag is <isDag>
    And topological order is <order>

    Examples:
      | graphName  | isDag | order                        |
      | "tinyDG"   | false | null                         |
      | "tinyDGnc" | true  | 8,7,6,9,11,10,12,2,3,0,5,4,1 |

  Scenario Outline: <graphName> cycles
    Given <graphName> graph
    When check cycles
    Then has cycle is <hasCycle>
    And cycle is <cycle>

    Examples:
      | graphName  | hasCycle | cycle       |
      | "tinyG"    | true     | 5,0,6,4,3,5 |
      | "tinyDG"   | true     | 2,3,2       |
      | "tinyDGnc" | false    | null        |

