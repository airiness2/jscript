$(document).ready(function(){
  function score_indicate(){
    // このような記述をすることで、subject_pointsという変数の中に
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]という配列を作成できる。
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];

    // さらにこのような記述をすることで、「合計点：」となっている右の部分に合計点が出力される
/*    let sum = subject_points[0];
    sum = sum + subject_points[1];
    sum = sum + subject_points[2];
    sum = sum + subject_points[3];
    sum = sum + subject_points[4];
    $("#sum_indicate").text(sum); */
    
    let sum = subject_points.reduce(function(a,b) {
        return a + b
    })
    $("#sum_indicate").text(sum);

    // ここに、上記を参考にして平均点を出力する処理を書き込む
    
/*    let ave = subject_points[0];
    ave = ave + subject_points[1];
    ave = ave + subject_points[2];
    ave = ave + subject_points[3];
    ave = ave + subject_points[4];
    $("#average_indicate").text(ave / 5); */
    
    let average = ( sum / 5);
    $("#average_indicate").text(average);

    return {x: subject_points, z:average}

  };


  function get_achievement(){
    // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
    let average = score_indicate();
    
    if (average.z >= 80) {
        $("#evaluation").text("A");
        return ("A")
    } else if ( average.z >= 60) {
        $("#evaluation").text("B");
        return ("B")
    } else if ( average.z >= 40) {
        $("#evaluation").text("C");
        return ("C")
    } else {
        $("#evaluation").text("D");
        return ("D")
    }
  }

  function get_pass_or_failure(){
    // ここに、全ての教科が60点以上なら"合格"の文字列、一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
    let subject_points = score_indicate();
    if (subject_points.x[0] >= 60 && subject_points.x[1] >= 60 && subject_points.x[2] >= 60 && subject_points.x[3] >= 60 && subject_points.x[4] >= 60) {
        return ("合格");
    } else {
        return ("不合格");
//    if (subject_points.select(|p| p  >= 60).length == subject_points.length) {
//         return ("合格")
//    } else {
//        return ("不合格")
    }
  };
  

  function judgement(){
    // ここに、「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する処理を書き込む
    // 下記の記述をすることで、「最終ジャッジ」のボタンを押すと「あなたの成績は（ここに「ランク」の値を入れる）です。（ここに「判定」の値を入れる）です」という文字の入った水色のフキダシが出力される処理が実装される。
    let evaluation = get_achievement();
    let judge = get_pass_or_failure();

    $('#alert-indicate').remove();    
    $('#declaration').append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${evaluation}です。${judge}です</label>`);

  };

  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    score_indicate();
  });

  $('#btn-evaluation').click(function() {
    get_achievement();
  });

  $('#btn-judge').click(function() {
    const result = get_pass_or_failure();
    $("#judge").text(result);
  });

  $('#btn-declaration').click(function() {
    judgement();
  });
});

// ここに書かれているjsの記述はあくまでヒントとして用意された雛形なので、書かれている記述に従わずに実装したいという場合は、自分の好きに実装して構わない。課題要件を満たし、コードの品質が一定の水準にあると判定されればどのような実装でも合格になる。
// 例ではJavaScriptとJqueryの両方の記述を使用しているが、どちらかに統一しても構わない

