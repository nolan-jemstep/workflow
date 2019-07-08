```js
import Workflow from './workflow';

const items = [
  { id: 'one', next: 'two', render: 'one' },
  { id: 'two', next: 'three', render: 'two' },
  { id: 'three', render: 'three' },
];

<Workflow items={items} />;
```
