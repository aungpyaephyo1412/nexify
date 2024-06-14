import LoadingCircle from '@/components/loading-circle';

const HomeLoading = () => {
  return (
    <div className="w-full flex justify-center items-center py-2 min-h-[200px] h-dvh">
      <LoadingCircle />
    </div>
  );
};

export default HomeLoading;
