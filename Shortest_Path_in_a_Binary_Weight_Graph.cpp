const MAX_VALUE = Number.MAX_VALUE;

const minDist = (n, src, adj) => {
    
    // Initialize distances to infinity
    const dist = Array(n).fill(MAX_VALUE);
    dist[src] = 0;

    // Use Queue for 0-1 BFS
    const dq = [src];

    while (dq.length > 0) {
        const u = dq.shift();

        // Process all adjacent vertices
        for (const edge of adj[u]) {
            const v = edge[0];
            const weight = edge[1];

            // If we can improve the distance
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;

                // If weight is 0, push to front (higher priority)
                // If weight is 1, push to back (lower priority)
                if (weight === 0) {
                    dq.unshift(v);
                } 
                else {
                    dq.push(v);
                }
            }
        }
    }

    return dist;
};

const main = () => {
    const n = 9;
    const src = 0;
    const edges = [
        [0, 1, 0],
        [0, 7, 1],
        [1, 2, 1],
        [1, 7, 1],
        [2, 3, 0],
        [2, 5, 0],
        [2, 8, 1],
        [3, 4, 1],
        [3, 5, 1],
        [4, 5, 1],
        [5, 6, 1],
        [6, 7, 1],
        [7, 8, 1]
    ];

    // Create adjacency list representation of the graph
    const adj = Array.from({ length: n }, () => []);
    for (const edge of edges) {
        adj[edge[0]].push([edge[1], edge[2]]);
        adj[edge[1]].push([edge[0], edge[2]]);
    }

    const res = minDist(n, src, adj);
    console.log(res.join(' '));
};

main();
