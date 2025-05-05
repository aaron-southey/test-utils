# test-utils
Test utilities to simulate random data creation for testing purposes

# Useage
Import the function and call it where nessecary, you'll be able to access the partitions like:

```javascript

import { person } from "./path/to/person"

const personData = person()

const personFirstname = personData.name.firstname
```

