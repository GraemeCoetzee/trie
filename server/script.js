const MAX_CHAR = 26;

let currentID = 0;
let nodeData = [];
let edgesData = [];

class TrieNode {
    constructor() {
        this.children = [];
        this.isEndOfWord = false;
        this.id = 0;
        this.character = '';
    }

    insert(word, root) {
        let crawler =  root;

        for(let i = 0; i < word.length; ++i) {
            let index = findCharacter(crawler, word[i]);
            if(index === -1) {
                let newChild = new TrieNode();
                newChild.character = word[i];
                crawler.children.push(newChild);

                newChild.id = ++currentID;

                nodes.update([{ id: currentID, label: word[i] }]);
                edges.update([{ from: crawler.id , to: currentID }]);
            }

            index = findCharacter(crawler, word[i]);
            crawler = crawler.children[index];
        }

        crawler.isEndOfWord = true;
    }
}

function findCharacter(currentNode, character) {
    for(let i = 0; i < currentNode.children.length; ++i) {
        if(currentNode.children[i].character === character) {
            return i;
        }
    }
    return -1;
}

function add() {
    let word = document.getElementById('addWord');
    root.insert(word.value, root);
    network.redraw();
}

function findWord(word, root) {
    let crawler = root;

    for(let i = 0; i < word.length; ++i) {
        let index = findCharacter(crawler, word[i]);

        if(index === -1) {
            return false;
        }

        crawler = crawler.children[index];
    }

    return crawler.isEndOfWord;
}

function search() {
    let word = document.getElementById('searchWord').value;
    let found = findWord(word, root);

    if(found) {
        alert("Word found");
    } else {
        alert("Word not found, enter was not enetered explicitly.")
    }
}

let root = new TrieNode();

// Populate Network Graph

let nodes = new vis.DataSet([
    { id:0, label: 'Root' }
]);
 
let edges = new vis.DataSet(
);
 
let container = document.getElementById('mynetwork');
let data = {
    nodes: nodes,
    edges: edges
};

let options = {
    "layout": {
        "hierarchical": {
            "enabled": true,
            "levelSeparation": 100,
            direction: "UD",
            sortMethod: "directed",
        }
    },
    "edges": {
        "smooth": {
            "type": "continuous"
        },
        "length": 10
    },
    "nodes": {
        "physics": false
    }
};;

let network = new vis.Network(container, data, options);