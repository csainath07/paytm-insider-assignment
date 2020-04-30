import { lazy } from 'react';
import "./style.scss";


const HomeRouteDetails = {
  path: '/',
  exact: true,
  component: lazy(() => import('./Home'))
}

export {
  HomeRouteDetails
}