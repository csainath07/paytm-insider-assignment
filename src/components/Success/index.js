import { lazy } from 'react';
import "./style.scss";


const SuccessRouteDetails = {
  path: '/success',
  exact: true,
  component: lazy(() => import('./Success'))
}

export {
  SuccessRouteDetails
}