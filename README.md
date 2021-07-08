# tanXnat
READ.
1. Module `common`
- Root function `to` when import, you need import with syntax `import common from "tanxnat"`, then follow me in below:

```
  const {to} = common
  const {spacePhone, friendly, random, vn} = to
```

+ `spacePhone` is function convert phone from `0968381829` to `0968 381 829`
```
spacePhone("0968381829") => "0968 381 829"
```
+ ```random``` is function random a `string` with input is length also you will expect
```
random(7) => "tanXnat"
```
+ ```friendly``` is function convert a `string` to `uri` with input "My A Me" => "my-a-me"
```
friendly("My A Me") => "my-a-me"
```
+ ```vn``` is function convert `Tôi là ai` to `Toi la ai` 
```
vn(`Tôi là ai`) => `Toi la ai`
```
2. Module `core`
  
3. Module `fp`

4. Module `handler`

5. Module `validator`
