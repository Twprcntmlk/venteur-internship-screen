# Technical Screen Project for Venteur

The following is a short exercise to serve as a technical screen for an internship opportunity at Venteur.  The scope of this exercise is to build a single page benefits calculator in React.  This is largely to make sure that you have some familiarity with the technologies we use at Venteur.  For context, our front-end is built with React, Typescript, and Redux.

## Functional Requirements

The overall goal is to allow a user explore the life insurance quotes available to them based on their location (zip code & county pair).

1. Users should be able to enter in their zip code and if needed select their county if there are multiple counties associated with the zip code.
2. Users should be able to enter in their age, gender, and smoking status.
3. Once their location, age, gender, and smoking status is provided, users should be presented with a list of products and a set of controls to adjust term length and benefit amount.
4. Users should be able to see the quoted price for the products available based on the selected term and benefit amount.

## Evaluation Criteria
1. **Functional**: Calculator is functional based upon the above requirement.  We aren't looking for it to be pretty, so focus on functionality.  Again, this is meant to demonstrate your familiarity with some of our technologies, namely React.
2. **Code Quality**: This is mostly to understand your fluency with the language and frameworks.  Write your code in what is most comfortable for you.

## Getting Started
1. If you don't have NodeJS installed, install [NodeJS](https://nodejs.org/en/).
2. Create a new Create React App.  Optionally, use the typescript template
```
npx create-react-app venteur-internship-screen --template typescript
```
3. To get your local development environment started, you can refer to the [Create React App Documentation](https://create-react-app.dev/docs/getting-started/).


## Instructions

1. Create your caculator as a single page React app with the above instructions.  While we use typescript at Venteur, it's not mandatory that you use it for this exercise if you aren't familiar with it.  We prefer you show us what your are comfortable with.
2. Use the API information below for your calculator to connect your UI up to data.
3. Upload your application to a repo at your github and send an e-mail to dev@venteur.co with a link to your github repo.

## API Documentation

The API is available at http://tech-screen.venteur.co/

<table>
<tr><td>

Endpoint

</td><td>

`GET /ZipCounties`

</td></tr>
<tr><td>

Description

</td><td>

Lookup location details for a zip-code

</td></tr>
<tr><td>

Query Parameters

</td><td>

`zip`: a 5-digit zip-code

</td></tr>
<tr><td>

Responses

</td><td>

`200`: Success, response body is an array of one or more `zipCounty` objects<br/>
`400`: Bad Request, the zip-code query parameter was missing or invalid<br/>
`404`: Not Found, no locations found with the given zip-code

</td></tr>
<tr><td>

Response Body

</td><td>

```
[
    {
        "id": string,
        "zip": string,
        "city": string,
        "state": string,
        "country": string
    }
]
```

</td></tr>
</table>

<table>
<tr><td>

Endpoint

</td><td>

`POST /Policies/Quote`

</td></tr>
<tr><td>

Description

</td><td>

Get policy quotes for an individual

</td></tr>
<tr><td>

Request Body

</td><td>

```
{
    "zipCountyId": string,
    "age": number,
    "gender": string,
    "smoker": string
}
```

</td></tr>
<tr><td>

Responses

</td><td>

`200`: Success, response body is an array of one or more `policy` objects<br/>
`400`: Bad Request, the request body was missing or invalid

</td></tr>
<tr><td>

Response Body

</td><td>

```
[
    {
        "id": string,
        "zipCountyId": string,
        "carrierName": string,
        "term": string,
        "minBenefitAmount": number,
        "maxBenefitAmount": number,
        "annualPremiumRate": number
    }
]
```
Note: the `annualPremiumRate` is per $5,000 of benefit amount.

</td></tr>
</table>

<table>
<tr><td>

Endpoint

</td><td>

`POST /Policies/Enroll`

</td></tr>
<tr><td>

Description

</td><td>

Enroll an individual into a policy

</td></tr>
<tr><td>

Request Body

</td><td>

```
{
    "zipCountyId": string,
    "age": number,
    "gender": string,
    "smoker": string,
    "policyId": string,
    "benefitAmount": number
}
```

</td></tr>
<tr><td>

Responses

</td><td>

`200`: Success<br/>
`400`: Bad Request, the request body was missing or invalid

</td></tr>
</table>

The following fields are enums and have a limited set of values

<table>
<tr><td>

`gender`

</td><td>

`"male"`<br/>
`"female"`

</td></tr>
<tr><td>

`smoker`

</td><td>

`"nonsmoker"`<br/>
`"smoker"`

</td></tr>
<tr><td>

`term`

</td><td>

`"years10"`<br/>
`"years20"`<br/>
`"years30"`<br/>
`"wholelife"`

</td></tr>
</table>

## Got Questions?
Email us at dev@venteur.co.
