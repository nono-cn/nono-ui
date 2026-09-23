import type { ComponentDocConfig } from '../component-docs'
import SearchBasicExample from '../../components/examples/search/SearchBasicExample.vue'
import SearchMultipleRegionsExample from '../../components/examples/search/SearchMultipleRegionsExample.vue'

const searchConfig: ComponentDocConfig = {
  slug: 'search',
  title: 'Search',
  language: 'en',
  description: 'Semantic container for grouping search controls.',
  importPath: '@nono-ui/components/ui/Search',
  usage: [
    {
      title: 'Basic search',
      description: 'Group a field and button inside an accessible search region.',
      component: SearchBasicExample,
    },
  ],
  examples: [
    {
      title: 'Multiple regions',
      description: 'Give each search form its own accessible name.',
      component: SearchMultipleRegionsExample,
    },
  ],
  accessibility: [
    {
      title: 'Search region',
      description:
        'Search renders a form with role="search". Add an accessible name (aria-label / aria-labelledby) to distinguish the search region when the page contains more than one.',
    },
  ],
  api: {
    props: [],
    emits: [],
    slots: [
      {
        name: 'default',
        type: '-',
        description: 'Search form controls and content.',
      },
    ],
    expose: [],
  },
}

export default searchConfig
