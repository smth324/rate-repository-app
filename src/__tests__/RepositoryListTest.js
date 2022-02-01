import { RepositoryListContainer } from '../components/RespositoryList'
import { render, fireEvent, within } from '@testing-library/react-native';

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      const items = getAllByTestId('repositoryItem')
      const [firstRepositoryItem, secondRepositoryItem] = items;
      expect(firstRepositoryItem).toHaveTextContent("jaredpalmer/formik")
      expect(firstRepositoryItem).toHaveTextContent('Build forms in React, without the tears')
      expect(firstRepositoryItem).toHaveTextContent('TypeScript')

      expect(within(firstRepositoryItem).getByTestId('Stars')).toHaveTextContent('21.9k')
      expect(within(firstRepositoryItem).getByTestId('Stars')).toHaveTextContent('Stars')
      expect(within(firstRepositoryItem).getByTestId('Forks')).toHaveTextContent('1.6k')
      expect(within(firstRepositoryItem).getByTestId('Forks')).toHaveTextContent('Forks')
      expect(within(firstRepositoryItem).getByTestId('Reviews')).toHaveTextContent('3')
      expect(within(firstRepositoryItem).getByTestId('Reviews')).toHaveTextContent('Reviews')
      expect(within(firstRepositoryItem).getByTestId('Ratings')).toHaveTextContent('88')
      expect(within(firstRepositoryItem).getByTestId('Ratings')).toHaveTextContent('Ratings')


      expect(secondRepositoryItem).toHaveTextContent("async-library/react-async")
      expect(secondRepositoryItem).toHaveTextContent('Flexible promise-based React data loader')
      expect(secondRepositoryItem).toHaveTextContent('JavaScript')

      expect(within(secondRepositoryItem).getByTestId('Stars')).toHaveTextContent('1.8k')
      expect(within(secondRepositoryItem).getByTestId('Stars')).toHaveTextContent('Stars')
      expect(within(secondRepositoryItem).getByTestId('Forks')).toHaveTextContent('69')
      expect(within(secondRepositoryItem).getByTestId('Forks')).toHaveTextContent('Forks')
      expect(within(secondRepositoryItem).getByTestId('Reviews')).toHaveTextContent('3')
      expect(within(secondRepositoryItem).getByTestId('Reviews')).toHaveTextContent('Reviews')
      expect(within(secondRepositoryItem).getByTestId('Ratings')).toHaveTextContent('72')
      expect(within(secondRepositoryItem).getByTestId('Ratings')).toHaveTextContent('Ratings')
    });
  });
});