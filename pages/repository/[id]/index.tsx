import type { NextPage } from 'next';
import Head from 'next/head';
import FloatingFooter from '../../../components/FloatingFooter';
import Navbar from '../../../components/Navbar';
import Image from 'next/image';
import { Menu } from 'react-feather';
import AppLayout from '../../../layouts';

const repositoryData20212022 = [
  { department: 'Departemen Pelayanan & Galeri Lawang' },
  { department: 'Departemen Riset & Pengembangan' },
  { department: 'Departemen Hubungan Mahasiswa' },
  { department: 'Program Kerja Kolektif & Fungsional' }
];

const RepositoryDetail: NextPage = () => {
  return (
    <AppLayout title="Repository Detail">
      <div className="w-full h-[500px] bg-[#282828]"></div>
      <div className="my-8 ml-2">
        <div className="text-3xl font-medium mb-2">
          Talkshow BBI x Galeri Lawang
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <div>
            <div className="text-lg font-light flex">
              <div className="flex-1">Periode</div>
              <div className="flex-1">: 2021/2022</div>
            </div>
            <div className="text-lg font-light flex">
              <div className="flex-1">Tanggal</div>
              <div className="flex-1">: 11 Februari 2022</div>
            </div>
            <div className="text-lg font-light flex">
              <div className="flex-1">Peserta</div>
              <div className="flex-1">: 40 orang</div>
            </div>
            <div className="text-lg font-light flex">
              <div className="flex-1">Kolaborator</div>
              <div className="flex-1">: IMA-FTUI, HMPSARS</div>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div className="font-medium">
                Departemen Riset dan Pengembangan
              </div>
              <div className="font-light">Ketua Departemen: Petra Yonathan</div>
            </div>
            <div>
              <div className="font-medium">
                Bidang Pengabdian Masyarakat dan Galeri Lawang
              </div>
              <div className="font-light">Ketua Bidang: Tia</div>
            </div>
          </div>
          <div>
            <div className="font-medium">Deskripsi Program</div>
            <div className="font-light">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure
              odio iusto reiciendis tempore expedita quasi. Quae provident
              explicabo quasi, repudiandae cumque inventore nam blanditiis porro
              vel eveniet laudantium asperiores aspernatur deleniti recusandae
              officia harum libero dolorem consectetur velit dolorum, ipsa sunt.
              Odit ipsum voluptatem iure natus quisquam labore nam alias, est
              aut porro obcaecati commodi dicta nesciunt doloribus ipsa
              asperiores laudantium, reprehenderit inventore! Tenetur facilis
              nisi tempora ipsum? Mollitia quod velit pariatur reprehenderit
              cumque incidunt iste quaerat debitis recusandae iure, distinctio
              eum sapiente inventore modi facilis voluptate nostrum dolore
              delectus aliquam numquam culpa? Quam nam sit accusantium
              necessitatibus alias animi.
            </div>
          </div>
          <div>
            <div className="font-medium">Giussepe Gratiano</div>
            <div className="font-light">Cynthia</div>
            <div className="font-light">Dominikus Gusti</div>
            <div className="font-light">Melissa</div>
            <div className="font-light">Pricilla Adeline</div>
            <div className="font-light">Vanessa Rahardja</div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default RepositoryDetail;
