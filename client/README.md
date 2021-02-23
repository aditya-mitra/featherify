## Folder Structure

-   **_`lib` _**

It contains external **api calls** and functions which are required for a desired result.
It can also be used for **markdowns**.

-   **_`utils`_**

It contains **default settings** and **functions** which are required not very often.
Instead of putting these functions in a `.tsx` file, it can better to put them in the utils folder.
Functions and Variables in these folder can even be required by the `lib` folder.

-   **_`assets`_**

It contains images, videos, svgs and other files which can be required by the app.

-   **_`components`_**

It contains _react functional components_ which are being rendered.

-   **_`contexts`_**

It contains _react context providers_ and _hooks from these contexts_ for a consistent _state_ which can be used across multiple components under the same provider.

-   **_`hooks`_**

It contains _independent react hooks_ which are used to customize the hooks provided by `react`.

-   **_`pages`_**

It contains _nextjs pages_ which are _hydrated_ to `HTML` pages.

### To Do

-   If mentioned in the hashnode rules, add an `eslint config` over **airbnb**.

-   Change the colours and the gradients
