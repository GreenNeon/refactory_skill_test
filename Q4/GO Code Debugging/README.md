# Go Code Debugging
## Question 
```
//What will be printed when the code below is executed?
--> it will print the array size
//And fix the issue to assure that `len(m)` is printed as 10.
--> the issue fixed by moving the Add and changing N inside to 1,
		so it will always add new worker till N.
		The Wait function then moved to inside loop so the added worker will wait till done.
```