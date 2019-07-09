The `initial` prop can be used to start the workflow at some arbitrary item.

```js
import Workflow from './workflow';

const items = [
  { id: 'one', next: 'two', render: 'one' },
  { id: 'two', next: 'three', render: 'two' },
  { id: 'three', render: 'three' },
];

<Workflow items={items} initial="two" />;
```

If you omit the `initial` prop, then the first item in the workflow is selected by default.

```js
import Workflow from './workflow';

const items = [
  { id: 'one', next: 'two', render: 'one' },
  { id: 'two', next: 'three', render: 'two' },
  { id: 'three', render: 'three' },
];

<Workflow items={items} />;
```
