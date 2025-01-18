'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';

import { useLanguage } from '@/store/useLanguage';
import { useUser } from '@/store/useUser';
import { ItemImagesType, ListCreateType } from '@/lib/types/listType';
import toastMessage from '@/lib/constants/toastMessage';
import toasting from '@/lib/utils/toasting';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';

import uploadItemImages from '@/app/_api/list/uploadItemImages';
import createList from '@/app/_api/list/createList';

import StepOne from './_components/StepOne';
import StepTwo from './_components/StepTwo';
import StepThree from './_components/StepThree';

/**
 * TODO: 리
 * 헤더 왼쪽 글자에 따라 중앙위치 달라지는 것 조정하기(새로운P로)
 * createList, updateList api 이미지 업로드 방식 무엇으로 할지 정해서 통일시키기.
 */

//ReactHookForm 에러타입
export type FormErrors = FieldErrors<ListCreateType>;

export default function CreatePage() {
  const { language } = useLanguage();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const router = useRouter();

  /** step 관리 */
  const [step, setStep] = useState(1);

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  /** React Hook Form */
  //--- 초기세팅
  const methods = useForm<ListCreateType>({
    mode: 'onChange',
    defaultValues: {
      category: '',
      labels: [],
      collaboratorIds: [],
      title: '',
      description: '',
      isPublic: true,
      backgroundPalette: 'PASTEL',
      backgroundColor: 'PASTEL_PINK',
      items: [
        {
          rank: 0,
          title: '',
          comment: '',
          link: '',
          imageUrl: '',
        },
        {
          rank: 0,
          title: '',
          comment: '',
          link: '',
          imageUrl: '',
        },
        {
          rank: 0,
          title: '',
          comment: '',
          link: '',
          imageUrl: '',
        },
      ],
    },
  });

  //--- request용 데이터 만드는 함수.
  const formatData = () => {
    const originData = methods.getValues();

    //rank 정리
    originData.items.forEach((item, index) => {
      item.rank = index + 1;
    });

    //데이터 쪼개기
    const listData: ListCreateType = {
      ...originData,
      items: originData.items.map(({ ...rest }) => {
        return {
          ...rest,
          imageUrl: '',
        };
      }),
    };

    //이미지rank,extension & 이미지파일 배열
    const imageData: ItemImagesType = {
      listId: 0, //temp
      extensionRanks: originData.items
        .filter(({ imageUrl }) => imageUrl !== '')
        .map(({ rank, imageUrl }) => {
          return {
            rank: rank,
            extension:
              typeof imageUrl === 'object' ? (imageUrl?.[0]?.type.split('/')[1] as 'jpg' | 'jpeg' | 'png') : '',
          };
        }),
    };

    const imageFileList: File[] = originData.items
      .filter(({ imageUrl }) => imageUrl !== '')
      .map(({ imageUrl }) => imageUrl?.[0] as File);

    return { listData, imageData, imageFileList };
  };

  //--- 이미지 업로드
  const { mutate: uploadImageMutate, isPending: isUploadingImage } = useMutation({
    mutationFn: uploadItemImages,
    retry: 3,
    retryDelay: 1000,
    onError: () => {
      toasting({ type: 'error', txt: toastMessage[language].uploadImageError });
    },
  });

  //--- 리스트생성
  const {
    mutate: createListMutate,
    isPending: isCreatingList,
    isSuccess,
  } = useMutation({
    mutationFn: createList,
    onSuccess: (data) => {
      if (formatData().imageData.extensionRanks.length !== 0) {
        uploadImageMutate({
          listId: data.listId,
          imageData: formatData().imageData,
          imageFileList: formatData().imageFileList,
        });
      }
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.getAllList,
          user.id + '',
          formatData().listData.collaboratorIds.length === 0 ? 'my' : 'collabo',
        ],
      });
      router.replace(`/list/${data.listId}`);
    },
    onError: () => {
      toasting({ type: 'error', txt: toastMessage[language].createListError });
    },
  });

  //--- 제출
  const handleSubmit = () => {
    const { listData } = formatData();
    createListMutate(listData);
  };

  return (
    <FormProvider {...methods}>
      {step === 1 && <StepOne onNextClick={handleNext} type="create" />}
      {step === 2 && <StepTwo onBeforeClick={handleBack} onNextClick={handleNext} type="create" />}
      {step === 3 && (
        <StepThree
          onBeforeClick={handleBack}
          onNextClick={handleSubmit}
          isSubmitting={isUploadingImage || isCreatingList || isSuccess}
          type="create"
        />
      )}
    </FormProvider>
  );
}
