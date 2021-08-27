# Recipe Keeper | Your only app for recipes

![Header](https://user-images.githubusercontent.com/31358977/131184183-233fe7c0-e725-4dc2-9cb6-c7537809ee00.png)

Recipe Keeper **keeps** your recipes in the same place. Share your most important recipes with the world, find them any time, and create shopping lists. Discover the recipes from around the world, bookmarked it and cook it later!

>This project was created with the help of the template next template: [batteries-includes-nextjs](https://github.com/antoniolofiego/Batteries-Included-Next.js)
>
>**Author:** [Antonio Lo Fiego](https://github.com/antoniolofiego/)

## Why Recipe Keeper?
I love to cook and bake bread. One of the problems I face **everytime** I want to make something new is finding recipes. Usually **low quality, with a brick of text, ads and a lot fluf**, only to make a simple recipe.

**Hashnode's Hackaton** made me able to materialize this dream. I wanted a place for people to share and gather recipes, in a common layout and confort, so they don't have to suffer finding the ingredients or instructions.

## Technology Stack
 Creating this app wasn't easy. A month of hard work and the project is just starting, since there's ton of possibilities to expand the idea further. The technology I choose helped with an easy, fast development.

### Next.js + TypeScript
My first framwork to learn was React. Next.js just take React to the literal **next level.** Super quick to set up, a nice and simple folder routing and a massive community. 

One of the key selling points of Next is its ability to perform Server Side Rendering and Static Sites at convenience. 

For this particular project, **TypeScript** worked flawlesly, helped with a lot of the type errors you encounter in normal JavaScript development. There's no real reason why one should stick to Vanilla JavaScript when TypeScript makes development so easy and fast.

### TailwindCSS
Tailwind is a pleasure to use. One of the best *(if not the best)* CSS frameworks out there. The productivity of building applications and reusable pieces with Tailwind is massive. Not external files, CSS-in-JS with utility classes are everything you need. 

The development process went with no problems, and thanks to their new JIT mode you can create even more flexible interfaces. 

### Supabase
The backend structure is powered by Supabase, a solution for backend as a service. Their SDK is fantastic, using a PostgreSQL database it allows to build almost anything. Fast response time and unlimited API calls.

Another important part of the backend is Storage (buckets) for the images of every recipe. Supabase makes both process easy to set up.

### Auth0
As a requirement for the Hackaton, Auth0 secures our users and their information. It's really easy to set up, and allows multiple services like Google or Github for authentication. 

Working with Auth0 was a no-brainer. I have to say they manage users in a flawless way. Combine with Next.js API routes, you only need to setup one file and your Authentication system is complete. Hands down an amazing service.

### Hosted and Deployed on Vercel
Vercel has been my only deployment platform on 2021. Their UI is just fantastic, give previews for PR and built-in analytics.

## Challenges and Features
This application works like a CMS, were you can create something similar like a blog post for recipes.

The first challenge was features. Joining quality of features plus usability was difficult. I ditched a lot of the ideas, but end up with a nice application I'm proud of. 

I work on a full month, from design in Figma to code in React.

### Full List Of Features 
* Create, edit and delete recipes
* Discover other's recipes
* Search by name, and filter by categories of recipes
* Bookmark recipes so you can access them later
* Create shopping lists for your recipes 

## Tour of the application: Let's create a recipe together!

## Development
You can clone & run: ```yarn install && yarn dev && yarn run css:dev```. 
