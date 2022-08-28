# Odeko Checkout interview project: Katie McGinley

## Instructions
To run this project, you must generate a client secret from (https://secret-shore-94903.herokuapp.com/accounts/2903b0e1-7446-4d3e-9018-901b01d43cb5)[here], or use a previously generated one.

Please note: this project runs with node v16.

Make a copy of the .env.example, named .env, and replace the placeholder for the client secret with the one you generated.

If you have not yet installed the dependencies, run the following command:

```bash
yarn
```

You can then use the following command to start the app:

```bash
yarn start
```

## Notes:
If this were in the context of work, rather than a limited time project, there are several things I would keep in mind more than I have here. These include:
- Testing: I prefer integration testing, and depending on how robust the backend is, I would either use mocks or live data. Assuming the backend is pretty stable and the tests don't take a prohibitive amount of time, I would test as part of a PR hook. I might also recommend testing on a nightly basis, in order to double check that there are no changes to the backend or whatever gateway layers may be in place that could cause issues.
- Accessability: I would take accessability much more into consideration, and make sure that the app is accessible via screen-readers, contrasts, color-blindness-friendly palletes, etc.
- Performance: In the context of this exercise I haven't taken bundle size or performance into account, but given a larger project and with more information about the users and benchmarks, I would optimize accordingly for things like if the user is generally on mobile data or in an area with a bad network connection (which I hear NYC can sometimes have).
- Responsiveness: Given that I am not sure whether the average customer for this project is likely to be using mobile or desktop, I would optimize accordingly with more information here.
- better handling of paginated data given the vendor rules: I would make sure that the user sees the same amount of products per page, taking into account the fact that some of them are filtered out based on vender rules regarding minimum orders and maximum quantity- it's a bit awkward to hit "show more" and get a variable and sometimes small number of products in the next batch.
- better handling of errors: I would make sure that the user is notified when an error occurs, and that the app is not broken, and that the error is logged somewhere for it to possibly be dealt with immediately by whoever is on-call based on severity.

Challenges:
- [x] Deal with paginated data
- Style the site
- [x] Vendor rules
- Implement client-side search of product names




