'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormContext, useWatch } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { CategoryType } from '@/lib/types/categoriesType';
import { QUERY_KEYS } from '@/lib/constants/queryKeys';
import { listCategoryRules, listDescriptionRules, listTitleRules } from '@/lib/constants/formInputValidationRules';
import { useLanguage } from '@/store/useLanguage';
import Header from '@/components/Header/Header';

import getCategories from '@/app/_api/category/getCategories';

import { listError, listLocale } from '@/app/list/create/locale';
import * as styles from './Step.css';

interface StepOneProps {
  onNextClick: () => void;
  type: 'create' | 'edit';
}

/**
 * StepOne 컴포넌트:
 * 리스트 생성/수정 과정 1단계
 *
 * @param props.onNextClick - 헤더의 '다음'버튼을 클릭했을때 동작시킬 함수
 * @param props.type - 생성과 수정 중 택1
 */
export default function StepOne({ onNextClick, type }: StepOneProps) {
  const { language } = useLanguage();
  const router = useRouter();

  /** 데이터 가져오기 */
  //--- 카테고리 가져오기
  const { data: categories } = useQuery<CategoryType[]>({
    queryKey: [QUERY_KEYS.getCategories],
    queryFn: getCategories,
    staleTime: Infinity,
  });

  /** React Hook Form */
  const {
    register,
    trigger,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useFormContext();

  //--- 글자수 세기
  const watchTitle = useWatch({ control, name: 'title' });

  /** 카테고리 선택 */
  const handleSelectCategory = (name: string) => {
    setValue('category', name);
    //setValue 후 유효성 재검사
    trigger('category');
  };

  const isValid = !errors.title && !errors.category && !errors.description;

  useEffect(() => {
    //카테고리 규칙 추가
    register('category', listCategoryRules);
    //페이지 로드 시  'title', 'category'필 드 유효성 검사 강제 실행
    trigger(['title', 'category']);
  }, [trigger, register, watchTitle]);

  return (
    <div className={styles.page}>
      <Header
        title={type === 'create' ? listLocale[language].createList : listLocale[language].editList}
        left="cancel"
        leftClick={() => {
          //TODO: 취소 바텀시트 필요
          router.back();
        }}
        right={
          <button className={styles.nextButton} onClick={onNextClick} disabled={!isValid}>
            {listLocale[language].next}
          </button>
        }
      />
      {/** end-Header */}
      <div className={styles.section}>
        <p className={styles.description}>
          기록하고 싶은 것들을 리스트로 남겨 봐요. <br />
          나만의 기준으로 순위를 매겨도 좋고, 하나의 주제의 정보를 정리해도 좋아요.
        </p>
        <div className={styles.field}>
          <label className={styles.label}>
            타이틀 <span className={styles.requiredIcon}>*</span>
          </label>
          <div className={styles.inputDiv}>
            <input
              className={styles.input}
              placeholder="리스트 제목을 적어주세요."
              autoComplete="off"
              maxLength={31}
              {...register('title', listTitleRules)}
            />
            <p className={watchTitle.length && errors.title ? styles.errorMessage : styles.length}>
              {(watchTitle || '').length}/30
            </p>
          </div>
          {/** end-input과 length 묶은 div */}
        </div>
        {/** end-타이틀field*/}
        <div className={styles.field}>
          <label className={styles.label}>소개</label>
          <textarea
            {...register('description', listDescriptionRules)}
            className={styles.textarea}
            placeholder="리스트에 대해 소개해주세요."
            rows={3}
            maxLength={201}
          />
          {errors.description && <span className={styles.errorMessage}>{listError[language].descriptionLength}</span>}
        </div>
        {/** end-소개field*/}
        <div className={styles.field}>
          <label className={styles.label}>
            카테고리 <span className={styles.requiredIcon}>*</span>
          </label>
          <div className={styles.categoryChipGroup}>
            {categories
              ?.filter((category) => category.code !== '0')
              .map((category) => (
                <button
                  className={
                    getValues('category') === category.engName ? styles.selectedCategoryChip : styles.categoryChip
                  }
                  key={category.code}
                  onClick={() => {
                    handleSelectCategory(category.engName);
                  }}
                >
                  {category.korName}
                </button>
              ))}
          </div>
        </div>
        {/** end-카테고리field*/}
      </div>
      {/** end-section*/}
    </div>
  );
}
