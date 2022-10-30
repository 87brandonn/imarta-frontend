import React, { useMemo, useState } from 'react';
import Image from 'next/future/image';
import { twMerge as cx } from 'tailwind-merge';
import AnimatedHero from '../AnimatedHero';
import MediaPreviewer from '../MediaPreviewer';
import { ImageInputType } from '../Admin/ImageInput';

type ImageLandingPageProps = {
  src: string;
  link?: string;
  type?: ImageInputType['type'];
  className?: string;
  priority?: boolean;
  showPreviewOnClick?: boolean;
  showYoutubePlayer?: boolean;
};

function ImageLandingPage({
  src,
  link,
  className,
  priority,
  type = 'image',
  showPreviewOnClick,
  showYoutubePlayer
}: ImageLandingPageProps) {
  const [show, setShow] = useState(false);

  const memoizedImage = useMemo(
    () => (
      <div
        className={cx(
          'relative h-full',
          showPreviewOnClick ? 'cursor-pointer' : ''
        )}
        onClick={() => {
          if (showPreviewOnClick) {
            setShow(true);
          }
        }}
      >
        {type === 'image' ? (
          <Image
            sizes="100vw"
            width="0"
            height="0"
            src={src}
            alt="im-img"
            className={cx(
              'object-contain w-full h-auto',
              showPreviewOnClick ? 'cursor-pointer' : '',
              className
            )}
            priority={priority}
          />
        ) : type === 'video' ? (
          <video src={src} controls className={cx('w-full', className)} />
        ) : showYoutubePlayer ? (
          <iframe
            src={`https://youtube.com/embed/${src}`}
            className={cx('w-full h-full', className)}
          />
        ) : (
          <Image
            src={`https://img.youtube.com/vi/${src}/0.jpg`}
            className={cx('w-full h-full object-contain', className)}
            alt="youtube"
            sizes="100vw"
            width={0}
            height={0}
          />
        )}
      </div>
    ),
    [type, src, showPreviewOnClick, className, priority, showYoutubePlayer]
  );

  return (
    <>
      {show && showPreviewOnClick && (
        <MediaPreviewer
          type={type}
          isOpen={show}
          onChangeOpen={setShow}
          src={src}
        />
      )}
      <AnimatedHero className="h-full">
        {link ? (
          <a href={link} target="__blank">
            {memoizedImage}
          </a>
        ) : (
          memoizedImage
        )}
      </AnimatedHero>
    </>
  );
}

export default ImageLandingPage;
