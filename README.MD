# My project





## Installation

> The steps for installation

What needs to happen for installation are these steps:

### 1.) Install dependencies

```
npm install

or

yarn
```

### 2.) Transpile TypeScript -> Javascript && Run app.js

```
"start": "tsc && node ./dist/app.js"
```









## Limitations:

> Limitations of API

An issue I found with this url is that it will only "List a maximum of 250 commits".

```
/repos/{owner}/{repo}/pulls/{pull_number}/commits
```

This essentially means that if the commits are over 250 one request won't be sufficient enough to get the full count.

### Solution 1 (Not Ideal):

First we check if the commits equals 250, if it does then essentially we need to keep scanning pages until we either find a 0 or a < 250.

This is not ideal because we would need to do as many API requests as pages exist. Considering all we care about is the number

### Solution 2 (Ideal):

An ideal way to handle this scenario would require that in the response we are returned either how many items in total there are, or maxPages. 

If we get maxPages then we can do some math and only do a second request for the final page.








## API Design

> Ideas behind the API design

### Rest API:

For the REST API, I think following the github API standards would be best. With our added data point.

```
/repos/{owner}/{repo}/pulls
```

### GRPC API:

I think this would be extremely easy in a RPC style.

```
getPulls()
```


## Resources:

Planning: https://github.com/AlexanderCarlston/my-project/projects/1



## Future Wants

> I had run into the issue of the API rate limiter


### Rate limit

A big issue I had run into tests was that I didn't have the ability to constantly run real end to end tests to get the tests where I wanted them.

<br>

### Solution

The solution I was going down was creating a .ENV to use the client token/secret to get more rate limit API calls.


The reason I chose against this for this stage was because it would add another step in the instructions that wouldn't give much benefits. As long as the requests are under 60 a day then this will work for now.