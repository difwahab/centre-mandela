import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { ChevronRight, Heart, Shield } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { NewsPost } from '@shared/schema';

const News = () => {
  const { t } = useTranslation();

  const { data: newsData = [], isLoading: newsLoading } = useQuery<NewsPost[]>({
    queryKey: ['/api/news?category=news'],
  });

  const { data: tipsData = [], isLoading: tipsLoading } = useQuery<NewsPost[]>({
    queryKey: ['/api/news?category=health-tips'],
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return t('news.unknownDate');
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: fr });
  };

  return (
    <section id="actualites" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            <span dangerouslySetInnerHTML={{ __html: t('news.title') }} />
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-text-medium max-w-3xl mx-auto">
            {t('news.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {newsLoading ? (
            Array(3)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-48 bg-neutral-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="w-32 h-5 bg-neutral-200 animate-pulse mb-2"></div>
                    <div className="w-full h-6 bg-neutral-200 animate-pulse mb-3"></div>
                    <div className="w-full h-20 bg-neutral-200 animate-pulse mb-4"></div>
                    <div className="w-24 h-5 bg-neutral-200 animate-pulse"></div>
                  </div>
                </div>
              ))
          ) : newsData.length > 0 ? (
            newsData.slice(0, 3).map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={
                      post.imageUrl ||
                      'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450'
                    }
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-text-medium text-sm mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    <span>{formatDate(post.publishDate)}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-text-medium mb-4">
                    {post.content.length > 120
                      ? `${post.content.substring(0, 120)}...`
                      : post.content}
                  </p>
                  <a href="#" className="text-primary font-medium hover:underline group">
                    {t('news.readMore')}{' '}
                    <ChevronRight className="inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p>{t('news.noNews')}</p>
            </div>
          )}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">{t('news.healthTips')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tipsLoading ? (
              Array(2)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-neutral-100 p-6 rounded-xl">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-neutral-200 animate-pulse mr-4 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="w-3/4 h-6 bg-neutral-200 animate-pulse mb-2"></div>
                        <div className="w-full h-24 bg-neutral-200 animate-pulse mb-2"></div>
                        <div className="w-24 h-5 bg-neutral-200 animate-pulse mt-2"></div>
                      </div>
                    </div>
                  </div>
                ))
            ) : tipsData.length > 0 ? (
              tipsData.slice(0, 2).map((tip, index) => (
                <div key={tip.id} className="bg-neutral-100 p-6 rounded-xl">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-4 flex-shrink-0">
                      {index === 0 ? <Heart className="h-6 w-6" /> : <Shield className="h-6 w-6" />}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">{tip.title}</h4>
                      <p className="text-text-medium">
                        {tip.content.length > 150
                          ? `${tip.content.substring(0, 150)}...`
                          : tip.content}
                      </p>
                      <a href="#" className="text-primary font-medium hover:underline mt-2 inline-block">
                        {t('news.learnMore')}
                      </a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-8">
                <p>{t('news.noTips')}</p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="transition-all hover:-translate-y-0.5 hover:shadow-md">
            {t('news.viewAll')}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default News;
