export const TODO_FILTER5 = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  PARTIAL: 'partial',
} as const  

export const FILTERS_BUTTONS = {
  [TODO_FILTER5.ALL]: {
    literal: 'Todos',
    href: `/?filter=${TODO_FILTER5.ALL}`
  },
  [TODO_FILTER5.ACTIVE]: {
    literal: 'Activos',
    href: `/?filter=${TODO_FILTER5.ACTIVE}`
  },
  [TODO_FILTER5.COMPLETED]: {
    literal: 'Completados',
    href: `/?filter=${TODO_FILTER5.COMPLETED}`
  },

} as const 
