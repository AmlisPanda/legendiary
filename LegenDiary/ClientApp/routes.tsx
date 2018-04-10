import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';

export const routes = <Layout>
    <Route path="/" component={Home} />
    <Route path="/user" component={Counter} />
</Layout>;
