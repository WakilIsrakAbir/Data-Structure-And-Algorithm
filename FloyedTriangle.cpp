using namespace std;

void printfloydtriangle(int n)
{
    int i, j, val = 1;
    for (i = 1; i <= n; i++)
    {
        for (j = 1; j <= i; j++)
            cout << val++ << " ";
        cout << endl;
    }
}

int main()
{
    printfloydtriangle(6);
    return 0;
}
