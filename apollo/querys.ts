import { gql } from '@apollo/client';

export const searchDoujin = gql`
  query SearchDoujin($doujinID: ID!) {
    nhentai {
      info(doujin_id: $doujinID) {
        title {
          english
          japanese
        }
        id
      }
    }
  }
`;

export const getDoujinFromUrl = gql`
  query GetDoujin($doujinId: ID!) {
    nhentai {
      info(doujin_id: $doujinId) {
        title {
          english
          japanese
        }
        images {
          url
        }
        url
        id
      }
    }
  }
`;
