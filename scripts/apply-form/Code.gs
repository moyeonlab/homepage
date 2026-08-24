/**
 * 모연 신입 학회원 지원서 — 구글 폼 생성 스크립트
 *
 * 왜 스크립트로 만드나:
 *   폼을 손으로 만들면 문항이 사람 머릿속에만 남는다. 다음 학기에 회장이 바뀌면
 *   「왜 이 문항이 있는지」를 아무도 모르고, 고치다 보면 원본과 달라진다.
 *   여기 코드가 정본이다 — 문항을 바꾸려면 이 파일을 고치고 다시 돌린다.
 *
 * 쓰는 법 (한 번만):
 *   1) 이 프로젝트를 Apps Script 편집기에서 연다
 *   2) 함수 목록에서 `폼만들기` 를 고르고 ▶ 실행
 *   3) 처음엔 권한 승인 창이 뜬다 — 모연 계정(moyeonlabs)으로 허용
 *   4) 실행 로그(Ctrl+Enter)에 «응답 시트 주소»와 «지원서 주소»가 찍힌다
 *
 * 문항을 고친 뒤 다시 돌리면 **새 폼이 하나 더 생긴다.** 기존 폼을 고치려면
 * `폼고치기(폼ID)` 를 쓴다 — 응답이 이미 쌓인 폼을 새로 만들면 응답이 갈라진다.
 */

var 설정 = {
  제목: '모두의문제연구소(모연) 신입 학회원 지원서',
  이메일: 'moyeonlabs@gmail.com',
  학회비: '10,000원',
  // ⚠ 상시 모집이라 «마감일»이 없다. 대신 «언제 답을 받는지»를 반드시 적는다 —
  //   마감이 없는 모집은 지원자가 「연락이 오긴 오나」를 가장 불안해한다.
  발표: '매월 말',
};

function 폼만들기() {
  var form = FormApp.create(설정.제목);
  _문항채우기(form);
  _응답시트연결(form);

  var 결과 = {
    지원서: form.getPublishedUrl(),
    짧은주소: form.shortenFormUrl(form.getPublishedUrl()),
    편집: form.getEditUrl(),
    폼ID: form.getId(),
  };
  Logger.log('─────────────────────────────────────────────');
  Logger.log('지원서 주소 (홈페이지에 넣을 것): ' + 결과.짧은주소);
  Logger.log('전체 주소                        : ' + 결과.지원서);
  Logger.log('편집 주소 (운영진용)             : ' + 결과.편집);
  Logger.log('폼 ID                            : ' + 결과.폼ID);
  Logger.log('─────────────────────────────────────────────');
  return 결과;
}

/** 이미 있는 폼의 문항을 이 코드 기준으로 다시 맞춘다 (응답은 그대로 둔다). */
function 폼고치기(폼ID) {
  var form = FormApp.openById(폼ID);
  var items = form.getItems();
  for (var i = items.length - 1; i >= 0; i--) form.deleteItem(items[i]);
  _문항채우기(form);
  Logger.log('문항을 다시 채웠습니다: ' + form.getPublishedUrl());
}

function _문항채우기(form) {
  form
    .setDescription(
      '모두의문제연구소(모연)는 한양대학교 ERICA 수리데이터사이언스학과의 데이터 분석 학회입니다.\n' +
        '데이터로 우리 주변의 문제를 찾고, 분석하고, 해결책을 제안합니다.\n\n' +
        '· 모집: 상시 모집 (마감 없음)\n' +
        '· 선발: 지원서 검토 — 면접 없음\n' +
        '· 발표: ' + 설정.발표 + ' 이메일로 개별 안내\n' +
        '· 학회비: ' + 설정.학회비 + '\n' +
        '· 문의: ' + 설정.이메일 + '\n\n' +
        '전공·학년·데이터 분석 경험과 무관하게 지원할 수 있습니다.'
    )
    .setConfirmationMessage(
      '지원서가 접수되었습니다.\n' +
        '합격 여부는 ' + 설정.발표 + '에 지원서에 적어 주신 이메일로 개별 안내드립니다.\n' +
        '문의: ' + 설정.이메일
    )
    .setCollectEmail(false)      // 이메일은 문항으로 직접 받는다 — 구글 로그인을 강제하지 않기 위해
    .setAllowResponseEdits(true) // 오타를 고칠 수 있게. 지원서라 여러 번 낼 일은 없다
    .setLimitOneResponsePerUser(false)
    .setProgressBar(true);

  form.addTextItem().setTitle('이름').setRequired(true);
  form.addTextItem().setTitle('학번').setRequired(true);
  form.addTextItem().setTitle('학과 · 전공').setRequired(true);

  form
    .addMultipleChoiceItem()
    .setTitle('학년')
    .setChoiceValues(['1학년', '2학년', '3학년', '4학년', '초과학기 · 기타'])
    .setRequired(true);

  form
    .addTextItem()
    .setTitle('연락처 (휴대폰)')
    .setHelpText('예: 010-1234-5678')
    .setRequired(true);

  form
    .addTextItem()
    .setTitle('이메일')
    .setHelpText('합격 안내를 받을 주소입니다. 정확히 적어 주세요.')
    .setRequired(true);

  form
    .addParagraphTextItem()
    .setTitle('지원 동기')
    .setHelpText('모연에서 무엇을 해보고 싶은지 자유롭게 적어 주세요. 분량 제한은 없습니다.')
    .setRequired(true);

  form
    .addCheckboxItem()
    .setTitle('관심 있는 주제')
    .setHelpText('여러 개 고를 수 있습니다. 선택 사항입니다.')
    .setChoiceValues([
      '캠퍼스 · 학교 생활',
      '경제 · 물가',
      '복지 · 제도',
      '지역사회',
      '환경 · 기후',
      '교육',
    ])
    .showOtherOption(true)
    .setRequired(false);

  form
    .addMultipleChoiceItem()
    .setTitle('데이터 분석 경험')
    .setHelpText('경험이 없어도 지원할 수 있습니다. 활동을 설계할 때 참고만 합니다.')
    .setChoiceValues([
      '없음',
      '수업에서 다뤄본 정도',
      '개인 프로젝트 경험 있음',
      '공모전 · 대회 참여 경험 있음',
    ])
    .setRequired(false);

  form
    .addParagraphTextItem()
    .setTitle('학기 중 참여 가능한 시간대')
    .setHelpText('정기 모임 일정을 잡을 때 참고합니다. 예: 화·목 오후, 주중 저녁')
    .setRequired(false);

  // ⚠ 개인정보 동의는 «맨 마지막»에, 무엇을 왜 받는지 적어 둔다.
  //   학회가 이름·학번·연락처를 받는 이상 형식적으로라도 근거가 있어야 한다.
  form
    .addMultipleChoiceItem()
    .setTitle('개인정보 수집 · 이용 동의')
    .setHelpText(
      '수집 항목: 이름, 학번, 학과, 학년, 연락처, 이메일\n' +
        '이용 목적: 학회원 선발 및 학회 활동 안내\n' +
        '보유 기간: 학회 활동 종료 후 1년 이내 파기\n' +
        '동의하지 않으셔도 되지만, 선발 절차를 진행할 수 없습니다.'
    )
    .setChoiceValues(['동의합니다'])
    .setRequired(true);
}

function _응답시트연결(form) {
  var ss = SpreadsheetApp.create(설정.제목 + ' (응답)');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  Logger.log('응답 시트: ' + ss.getUrl());
  return ss;
}
