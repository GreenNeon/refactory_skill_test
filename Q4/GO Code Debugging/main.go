//What will be printed when the code below is executed?
//And fix the issue to assure that `len(m)` is printed as 10.

package main

import (
	"fmt"
	"sync"
)

const N = 10

func main() {
	m := make(map[int]int)

	wg := &sync.WaitGroup{}
	mu := &sync.Mutex{}
	for i := 0; i < N; i++ {
		wg.Add(1)
		go func() {
			mu.Lock()
			fmt.Printf("Worker %d starting\n", i)
			m[i] = i
			mu.Unlock()
			defer wg.Done()
		}()
		wg.Wait()
	}
	println(len(m))
}
