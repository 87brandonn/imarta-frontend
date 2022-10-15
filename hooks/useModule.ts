import { useQuery } from 'react-query';
import axios from '../config/axios';
import { Attribute, Module, Section } from '../types';

const useModule = (slug?: string) =>
  useQuery(
    ['module', slug],
    async () => {
      const { data } = await axios.get<
        Module & {
          sections: (Section & {
            attributes: Attribute[];
          })[];
        }
      >(`/module/${slug}`);
      return data;
    },
    {
      enabled: !!slug
    }
  );

export default useModule;
