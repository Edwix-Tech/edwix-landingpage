import { useTranslations } from 'next-intl';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';

type TestimonialItem = {
  name: string;
  city: string;
  since: Date;
  quote: string;
  imagePath: string;
  explanation: string;
};

export function HomePageTestimonials() {
  const t = useTranslations('landing');
  const testimonials: TestimonialItem[] = [
    {
      name: 'Nathalie',
      city: 'Québec',
      since: new Date('2023-01-01'),
      quote: t('testimonials.nathalie.quote'),
      imagePath: '/images/testimonials/1.jpg',
      explanation: t('testimonials.nathalie.explanation'),
    },
    {
      name: 'Christian',
      city: 'Laval',
      since: new Date('2023-01-01'),
      quote: t('testimonials.christian.quote'),
      imagePath: '/images/testimonials/2.jpg',
      explanation: t('testimonials.christian.explanation'),
    },
  ];

  return (
    <Swiper
      modules={[Pagination]}
      slidesPerView="auto"
      pagination={{ clickable: true }}
      className="w-full overflow-hidden"
      centeredSlides
    >
      {testimonials.map(testimonial => (
        <SwiperSlide key={testimonial.name} className="px-4 pb-8 w-full max-w-md">
          <Card className="flex flex-col gap-4 p-6 py-10 border border-black h-full">
            <div className="flex flex-col gap-2 items-center">
              <Image
                src={testimonial.imagePath}
                alt={testimonial.name}
                width={100}
                height={100}
                className="object-cover h-16 w-16 rounded-full border border-black"
              />
              <div className="flex flex-col items-center">
                <h3 className="text-xs font-medium">
                  {testimonial.name}, {testimonial.city}
                </h3>
                <p className="text-xs">
                  {t('testimonials.userSince', { date: testimonial.since.toLocaleDateString() })}
                </p>
              </div>
            </div>
            <p
              className="text-xl text-center font-medium"
              dangerouslySetInnerHTML={{
                __html: `&ldquo;  ${testimonial.quote.replace(
                  /\*\*([^*]+)\*\*/g,
                  '<strong class="text-primary">$1</strong>'
                )}  &rdquo;`,
              }}
            ></p>
            <p className="text-xs text-muted-foreground">{testimonial.explanation}</p>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
