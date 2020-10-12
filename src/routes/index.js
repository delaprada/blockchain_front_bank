import React from 'react'
import { Redirect } from 'react-router-dom'
import Home from '../application/Home'
import Signin from '../components/Signin'
import Signup from '../components/Signup'
import Transfer from '../components/User/Transfer'
import Apply from '../components/Company/Apply'
import Exchange from '../components/Company/Exchange'
import Information from '../components/Company/Information'
import Acceptance from '../components/Bank/Acceptance'
import Review from '../components/Bank/Review'
import Bank from '../application/Bank'
import Company from '../application/Company'
import Person from '../application/Person'

export default [
    {
        path: "/",
        component: Home,
        routes: [
            // {
            //     path: "/",
            //     exact: true,
            //     render: () => (
            //         <Redirect to={"/signin"} />
            //     )
            // },
            {
                path: "/signin",
                component: Signin
            },
            {
                path: "/signup",
                component: Signup
            },
            {
                path: '/bank',
                component: Bank,
                routes: [
                    {
                        path: "/bank",
                        exact: true,
                        render: () => (
                            <Redirect to={"/bank/acceptance"} />
                        )
                    },
                    {
                        path: '/bank/acceptance',
                        component: Acceptance
                    },
                    {
                        path: '/bank/review',
                        component: Review
                    }
                ]
            },
            {
                path: '/company',
                component: Company,
                routes: [
                    {
                        path: "/company",
                        exact: true,
                        render: () => (
                            <Redirect to={"/company/apply"} />
                        )
                    },
                    {
                        path: '/company/apply',
                        component: Apply
                    },
                    {
                        path: '/company/exchange',
                        component: Exchange
                    },
                    {
                        path: '/company/information',
                        component: Information
                    },
                ]
            },
            {
                path: '/person',
                component: Person,
                routes: [
                    {
                        path: "/person",
                        exact: true,
                        render: () => (
                            <Redirect to={"/person/transfer"} />
                        )
                    },
                    {
                        path: '/person/transfer',
                        component: Transfer
                    }
                ]
            }
        ]
    },
]