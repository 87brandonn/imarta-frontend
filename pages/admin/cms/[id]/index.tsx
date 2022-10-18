import { useRouter } from 'next/router';
import HomeEventsInput, {
  HomeEventTypeFromApi
} from '../../../../components/Admin/HomeEventsInput';
import HomeHighlightsInput, {
  HomeHighlightTypeFromApi
} from '../../../../components/Admin/HomeHighlightsInput';
import ImageGridInput, {
  ImageGridType
} from '../../../../components/Admin/ImageGridInput';
import ImageInput from '../../../../components/Admin/ImageInput';
import OrganizationStructureInput, {
  OrganizationStructure
} from '../../../../components/Admin/OrganizationStructureInput';
import RepositoryInput from '../../../../components/Admin/RepositoryInput';
import TextAreaInput from '../../../../components/Admin/TextareaInput';
import TextInput from '../../../../components/TextInput';
import useModule from '../../../../hooks/useModule';
import useUpdateAttributes from '../../../../hooks/useUpdateAttributes';
import AdminLayout from '../../../../layouts/Admin';

function Admin() {
  const { query } = useRouter();

  const { data } = useModule(query.id as string);

  const { mutate: update } = useUpdateAttributes();

  const onChange = (
    val:
      | ImageGridType[]
      | HomeEventTypeFromApi
      | HomeHighlightTypeFromApi
      | OrganizationStructure[]
      | string
      | undefined,
    attributeId: number
  ) => {
    update({
      id: attributeId,
      data: val,
      slug: query.id as string
    });
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto mt-12">
        {data?.sections?.map(section => (
          <div
            className="bg-white mb-4 shadow-xl px-3 py-2 rounded-xl"
            key={section.id}
          >
            <div className="text-xl mb-3">{section.label}</div>
            {section.attributes.map(attribute => (
              <div className="mb-3" key={attribute.id}>
                <div className="text-lg mb-3">{attribute.label}</div>
                {attribute.type === 'HERO' ||
                attribute.type === 'IMAGE_BIG' ||
                attribute.type === 'IMAGE_SMALL' ? (
                  <ImageInput
                    data={attribute.data}
                    onChange={val => onChange(val, attribute.id)}
                  />
                ) : attribute.type === 'IMAGE_GRID' ||
                  attribute.type === 'SWIPER_CENTERED' ||
                  attribute.type === 'SWIPER_NORMAL' ? (
                  <ImageGridInput
                    data={attribute.data}
                    onChange={val => onChange(val, attribute.id)}
                    isOriginal={attribute.type === 'IMAGE_GRID'}
                  />
                ) : attribute.type === 'TITLE' ||
                  attribute.type === 'SUBTITLE' ? (
                  <TextInput
                    value={attribute.data}
                    onChange={({ target: { value } }) =>
                      onChange(value, attribute.id)
                    }
                  />
                ) : attribute.type === 'HOME_EVENTS' ? (
                  <HomeEventsInput
                    data={attribute.data}
                    // @ts-ignore
                    onChange={val => onChange(val, attribute.id)}
                  />
                ) : attribute.type === 'HOME_HIGHLIGHTS' ? (
                  <HomeHighlightsInput
                    data={attribute.data}
                    // @ts-ignore
                    onChange={val => onChange(val, attribute.id)}
                  />
                ) : attribute.type === 'ORGANIZATION_STRUCTURE_1' ? (
                  <OrganizationStructureInput
                    data={attribute.data}
                    // @ts-ignore
                    onChange={val => onChange(val, attribute.id)}
                  />
                ) : attribute.type === 'REPOSITORY_1' ? (
                  <RepositoryInput
                    data={attribute.data}
                    // @ts-ignore
                    onChange={val => onChange(val, attribute.id)}
                  />
                ) : (
                  <TextAreaInput
                    value={attribute.data}
                    onChange={({ target: { value } }) =>
                      onChange(value, attribute.id)
                    }
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}

export default Admin;
