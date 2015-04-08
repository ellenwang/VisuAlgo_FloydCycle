// definitions of question terminology
var definitionsArr = new Array();
definitionsArr.push(['sequence', 'The order matters. Do not forget to include the starting point (if given) as the first selection']);
definitionsArr.push(['subset', 'One or more vertices in any order']);
definitionsArr.push(['height', 'Height is defined as the number of edges from the root to the deepest leaf']);
definitionsArr.push(['rank', 'Rank is defined as the 1-based index in the sorted list of elements of the tree']);
definitionsArr.push(['O(n) Build Heap', 'As defined in the VisuAlgo heap visualisation']);
definitionsArr.push(['Adjacency Matrix', 'The smallest Adjacency Matrix representation for the graph']);
definitionsArr.push(['Second Best Minimum Spanning Tree', 'A Second Best Minimum Spanning Tree is a tree whose total weight of the edges is greater than the minimum spanning tree and lesser than any other spanning tree of the graph']);
definitionsArr.push(['type of graph', 'Only take into account properties of the graph. Your answer should apply to all graphs with the same properties as the graph below']);
definitionsArr.push(['balance factor', 'Balance Factor is defined as the difference between the height of the left subtree and the height of the right subtree.']);
definitionsArr.push(['Original Dijkstra\'s', 'Original Dijkstra\'s algorithm: a graph algorithm that solves the Single-Source Shortest Paths problem for a graph with non-negative edge weight']);
definitionsArr.push(['Modified Dijkstra\'s', 'Similar to Original Dijkstra\'s algorithm but employs \'Lazy Data Structure\' strategy to re-enqueue and re-process edges']);

const QUESTION_DIFFICULTY_EASY = "Easy";
const QUESTION_DIFFICULTY_MEDIUM = "Medium";
const QUESTION_DIFFICULTY_HARD = "Hard";

const ANSWER_TYPE_VERTEX = "vertex";
const ANSWER_TYPE_VERTEX_MCQ = "vertexMcq";
const ANSWER_TYPE_EDGE = "edge";
const ANSWER_TYPE_MCQ = "mcq";
const ANSWER_TYPE_FILL_BLANKS = "fillBlanks";

const ANSWER_AMT_ONE = 1;
const ANSWER_AMT_MULTIPLE = 2;

const MODE_GENERATE_QUESTIONS = 0;      //for training and control panel
const MODE_TEST_GENERATE_QUESTIONS = 1;   //for test and ans key
const MODE_CHECK_ANSWERS = 2;       //for training and control panel
const MODE_GET_ANSWERS = 3;         //for training and control panel
const MODE_GET_STUDENT_ANSWERS = 4;     //for future use
const MODE_CHECK_TEST_OPEN = 5;
const MODE_TEST_SUBMIT = 7;         //for test
const MODE_TEST_GET_INFO = 8;       //for test and ans key
const MODE_TEST_GET_ANSWERS = 9;      //for ans key
const MODE_TEST_GET_STUDENT_ANSWERS = 10; //for ans key
const MODE_ADMIN = 11;            //for control panel
const MODE_ADMIN_GET_CONFIG = 12;     //for control panel
const MODE_ADMIN_EDIT_CONFIG = 13;      //for control panel
const MODE_ADMIN_RESET_ATTEMPT = 14;    //for control panel
const MODE_ADMIN_GET_TRAINING_SESSION_STATS = 28; // for control panel
const MODE_GET_SCOREBOARD = 15;
const MODE_USER_TEST_LOGIN = 29;

const UNANSWERED = "unanswered";
const NO_ANSWER = "noAnswer";
const CORRECT = "correct";

const TEST_GENERATE_QUESTIONS_TYPE_TEST = "test";
const TEST_GENERATE_QUESTIONS_TYPE_ANSWER = "answer";