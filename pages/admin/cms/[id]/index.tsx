import { useRouter } from 'next/router';
import HomeEventsInput, {
  HomeEventType
} from '../../../../components/Admin/HomeEventsInput';
import ImageGridInput, {
  ImageGridType
} from '../../../../components/Admin/ImageGridInput';
import ImageInput from '../../../../components/Admin/ImageInput';
import TextAreaInput from '../../../../components/Admin/TextareaInput';
import useModule from '../../../../hooks/useModule';
import useUpdateAttributes from '../../../../hooks/useUpdateAttributes';
import AdminLayout from '../../../../layouts/Admin';

function Admin() {
  const { query } = useRouter();

  const { data } = useModule(query.id as string);

  const { mutate: update } = useUpdateAttributes();

  const onChangeImage = (val: string | undefined, attributeId: number) => {
    update({
      id: attributeId,
      data: { imgUrl: val },
      slug: query.id as string
    });
  };

  const onChangeImageGrid = (val: ImageGridType[], attributeId: number) => {
    update({
      id: attributeId,
      data: val,
      slug: query.id as string
    });
  };

  const onChangeHomeEvents = (val: HomeEventType[], attributeId: number) => {
    update({
      id: attributeId,
      data: val,
      slug: query.id as string
    });
  };

  const onInputChange = (
    val: JSX.IntrinsicElements['input']['value'],
    attributeId: number
  ) => {
    update({
      id: attributeId,
      data: { value: val },
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
                    data={attribute.data?.imgUrl}
                    onChange={val => onChangeImage(val, attribute.id)}
                  />
                ) : attribute.type === 'IMAGE_GRID' ||
                  attribute.type === 'SWIPER_CENTERED' ||
                  attribute.type === 'SWIPER_NORMAL' ? (
                  <ImageGridInput
                    data={attribute.data}
                    onChange={val => onChangeImageGrid(val, attribute.id)}
                    isOriginal={attribute.type === 'IMAGE_GRID'}
                  />
                ) : attribute.type === 'TITLE' ||
                  attribute.type === 'SUBTITLE' ? (
                  <TextAreaInput
                    value={attribute.data?.value}
                    onValueChange={val => onInputChange(val, attribute.id)}
                  />
                ) : attribute.type === 'HOME_EVENTS' ? (
                  <HomeEventsInput
                    data={attribute.data}
                    onChange={val => onChangeHomeEvents(val, attribute.id)}
                  />
                ) : (
                  <div>input</div>
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
