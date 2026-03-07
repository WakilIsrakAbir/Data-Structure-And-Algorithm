// JavaScript program to count number of spanning 
// trees using matrix exponentiation

// Function to perform matrix multiplication: c = a * b
function multiply(a, b, c, v) {

    let mod = 1e9 + 7;
    let temp = Array.from({ length: v }, () =>
        Array(v).fill(0)
    );

    // Triple nested loop for matrix 
    // multiplication
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            for (let k = 0; k < v; k++) {
                temp[i][j] = (temp[i][j] +
                    a[i][k] * b[k][j] % mod) % mod;
            }
        }
    }

    // Store the result back
    // into matrix c
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            c[i][j] = temp[i][j];
        }
    }
}

// Function to raise matrix a to power n and store in res
function power(a, n, res, v) {
    let mod = 1e9 + 7;

    // Initialize res as identity matrix
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            res[i][j] = (i === j) ? 1 : 0;
        }
    }

    let temp = Array.from({ length: v }, () =>
        Array(v).fill(0)
    );

    // Binary exponentiation
    while (n > 0) {
        if (n % 2 === 1) {
            multiply(a, res, temp, v);
            for (let i = 0; i < v; i++) {
                for (let j = 0; j < v; j++) {
                    res[i][j] = temp[i][j];
                }
            }
        }
        n = Math.floor(n / 2);
        multiply(a, a, temp, v);
        for (let i = 0; i < v; i++) {
            for (let j = 0; j < v; j++) {
                a[i][j] = temp[i][j];
            }
        }
    }
}

// Function to compute number of spanning trees 
// using adjacency matrix
function numOfSpanningTree(graph, v) {
    let mod = 1e9 + 7;

    let res = Array.from({ length: v }, () =>
        Array(v).fill(0)
    );

    // Create a copy of the input 
    // graph as matrix will be modified
    let temp = graph.map(row => row.slice());

    // Raise matrix to (v - 2) power
    power(temp, v - 2, res, v);

    // Compute the sum of all values in 
    // the resulting matrix
    let ans = 0;
    for (let i = 0; i < v; i++) {
        for (let j = 0; j < v; j++) {
            ans = (ans + res[i][j]) % mod;
        }
    }

    return ans;
}

// Driver code
let v = 4;
let e = 5;

let graph = [
    [0, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 0, 1],
    [1, 1, 1, 0]
];

console.log(numOfSpanningTree(graph, v));
