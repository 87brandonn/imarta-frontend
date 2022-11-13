import dayjs from 'dayjs';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType
} from 'next';
import Image from 'next/future/image';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/lazy';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import AppLayout from '../../../layouts';
import getWorkProgramById from '../../../services/api/getWorkProgramById';
import { WorkProgramWithAssociation } from '../../../services/api/getWorkPrograms';
import { AlertCircle } from 'react-feather';
import ImageLandingPage from '../../../components/ImageLandingPage';
import getAllWorkProgram from '../../../services/api/getAllWorkProgram';

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await getAllWorkProgram();
  return {
    paths: data.map(wp => ({ params: { id: wp.id.toString() } })), //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps<
  { data: WorkProgramWithAssociation },
  { id: string }
> = async context => {
  const data = await getWorkProgramById(
    context.params ? parseInt(context.params.id, 10) : undefined
  );
  return {
    props: { data },
    revalidate: 10
  };
};

function RepositoryDetail({
  data
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <AppLayout title="Repository Detail">
      {data.workProgramDocumentations?.length ? (
        <Swiper
          slidesPerView={1}
          pagination={{
            clickable: true
          }}
          preloadImages={false}
          lazy
          loop
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {data.workProgramDocumentations.map((documentation, i) => (
            <SwiperSlide key={i} className="!h-[50vh]">
              <ImageLandingPage
                src={documentation.imgUrl}
                type={
                  documentation.fileType === 'IMAGE'
                    ? 'image'
                    : documentation.fileType === 'VIDEO'
                    ? 'video'
                    : 'embed'
                }
                className="h-full object-contain"
                showYoutubePlayer
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="h-96 flex items-center flex-col justify-center">
          <AlertCircle />
          <div className="mt-2">No documentation available.</div>
        </div>
      )}

      <div className="my-8 ml-2">
        <div className="text-3xl font-medium mb-2">{data.name}</div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <div className="text-lg font-light flex">
              <div className="flex-1">Periode</div>
              <div className="flex-1">: {data.period.label}</div>
            </div>
            <div className="text-lg font-light flex">
              <div className="flex-1">Tanggal</div>
              <div className="flex-1">
                : {dayjs(data.startDate).format('DD MMMM YYYY')} -{' '}
                {dayjs(data.endDate).format('DD MMMM YYYY')}
                {}
              </div>
            </div>
            <div className="text-lg font-light flex">
              <div className="flex-1">Peserta</div>
              <div className="flex-1">: {data.participationCount}</div>
            </div>
            <div className="text-lg font-light flex">
              <div className="flex-1">Kolaborator</div>
              <div className="flex-1">: {data.collaborators}</div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            {data.workProgramDepartments?.map((wpDepartment, i) => (
              <div key={i}>
                <div className="font-medium">
                  {wpDepartment.department.name}
                </div>
                <div className="font-light">
                  Ketua Departemen: {wpDepartment.department.leader}
                </div>
              </div>
            ))}

            {data.workProgramFields?.map((wpField, i) => (
              <div key={i}>
                <div className="font-medium">{wpField.field.name}</div>
                <div className="font-light">
                  Ketua Departemen: {wpField.field.leader}
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="font-medium">Deskripsi Program</div>
            <div className="font-light">{data.description}</div>
          </div>
          <div>
            {data.workProgramStaffs?.map((staff, i) => (
              <div
                className={staff.isLead ? 'font-medium' : 'font-light'}
                key={i}
              >
                {staff.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default RepositoryDetail;
