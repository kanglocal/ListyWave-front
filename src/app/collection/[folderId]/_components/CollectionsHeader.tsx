'use client';

import BottomSheet from '@/components/BottomSheet/BottomSheet';
import Header from '@/components/Header/Header';

import useBooleanOutput from '@/hooks/useBooleanOutput';

interface HeaderContainerProps {
  handleSetOnBottomSheet: () => void;
  handleSetOnDeleteOption: () => void;
  isHideOption: boolean;
  headerTitle: string;
}

export default function HeaderContainer({
  handleSetOnBottomSheet,
  handleSetOnDeleteOption,
  isHideOption,
  headerTitle,
}: HeaderContainerProps) {
  const { isOn, handleSetOn, handleSetOff } = useBooleanOutput();

  const bottomSheetOptionList = [
    {
      key: 'editFolder',
      title: '폴더 이름 바꾸기', // TODO locale 적용
      onClick: handleSetOnBottomSheet,
    },
    {
      key: 'deleteFolder',
      title: '폴더 삭제하기',
      onClick: handleSetOnDeleteOption,
    },
  ];

  const RightButton = () => {
    const handleClickOption = () => {
      handleSetOn();
    };
    return <button onClick={handleClickOption}>수정</button>;
  };

  return (
    <>
      <Header
        title={headerTitle}
        left="back"
        right={!isHideOption && <RightButton />}
        leftClick={() => history.back()}
      />
      {isOn && <BottomSheet onClose={handleSetOff} optionList={bottomSheetOptionList} isActive />}
    </>
  );
}
