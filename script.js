const questions = [
 {q:"¿Cuál es el elemento principal de los metales ferrosos?",a:["Aluminio","Hierro","Cobre","Titanio"],c:1,e:"Los metales ferrosos tienen al hierro (Fe) como componente principal."},
 {q:"¿Qué significa BCC en la estructura de la ferrita?",a:["Cúbica centrada en las caras","Hexagonal compacta","Cúbica centrada en el cuerpo","Tetragonal simple"],c:2,e:"BCC es la estructura cúbica centrada en el cuerpo."},
 {q:"¿Cuál fase puede disolver más carbono y es estable a temperaturas elevadas?",a:["Ferrita","Austenita","Martensita","Grafito"],c:1,e:"La austenita (γ), de estructura FCC, puede disolver más carbono."},
 {q:"¿Cómo se obtiene normalmente la martensita?",a:["Por enfriamiento rápido de la austenita","Por oxidación al aire","Por laminación en frío","Por colada lenta"],c:0,e:"La martensita se forma mediante un enfriamiento rápido de la austenita."},
 {q:"¿Cuál es una propiedad mecánica?",a:["Densidad","Conductividad eléctrica","Dureza","Oxidación"],c:2,e:"La dureza es la resistencia de un material a la penetración o al desgaste."},
 {q:"¿Qué proceso reduce el espesor del metal al hacerlo pasar entre rodillos?",a:["Forjado","Laminado","Trefilado","Temple"],c:1,e:"El laminado reduce el espesor y modifica la sección del material mediante rodillos."},
 {q:"¿Cuál es el propósito principal del revenido después del temple?",a:["Aumentar la fragilidad","Eliminar todo el carbono","Reducir fragilidad y mejorar tenacidad","Convertir acero en fundición"],c:2,e:"El revenido ayuda a reducir la fragilidad generada por el temple y mejora la tenacidad."},
 {q:"¿Qué protección ayuda a reducir la corrosión del acero?",a:["Humedad","Galvanizado","Enfriamiento rápido","Aumento de porosidad"],c:1,e:"El galvanizado aplica una capa protectora de zinc que ayuda a evitar la corrosión."}
];
let current=0, answers=Array(questions.length).fill(null);
const content=document.getElementById('quizContent'), count=document.getElementById('questionCount'), bar=document.getElementById('progressBar'), prev=document.getElementById('prevBtn'), next=document.getElementById('nextBtn'), result=document.getElementById('quizResult');
function render(){
 const q=questions[current]; count.textContent=`Pregunta ${current+1} de ${questions.length}`;bar.style.width=`${(current+1)/questions.length*100}%`;
 content.innerHTML=`<h3 class="question">${current+1}. ${q.q}</h3><div class="answers">${q.a.map((a,i)=>`<button class="answer ${answers[current]===i?'selected':''}" data-i="${i}">${String.fromCharCode(65+i)}. ${a}</button>`).join('')}</div>`;
 content.querySelectorAll('.answer').forEach(b=>b.addEventListener('click',()=>{answers[current]=Number(b.dataset.i);render()}));
 prev.disabled=current===0;next.textContent=current===questions.length-1?'Ver resultado':'Siguiente';result.hidden=true;
}
prev.addEventListener('click',()=>{if(current>0){current--;render()}});
next.addEventListener('click',()=>{if(answers[current]===null){alert('Selecciona una respuesta para continuar.');return}if(current<questions.length-1){current++;render()}else showResult()});
function showResult(){
 const score=answers.reduce((s,a,i)=>s+(a===questions[i].c?1:0),0);
 content.innerHTML='';document.querySelector('.quiz-controls').style.display='none';count.textContent='Evaluación finalizada';bar.style.width='100%';
 result.hidden=false;result.innerHTML=`<h3>${score} / ${questions.length}</h3><b>${score===8?'¡Excelente trabajo!':score>=6?'¡Muy buen resultado!':score>=4?'Vas por buen camino':'Sigue repasando, puedes mejorar'}</b><p>Obtuviste ${Math.round(score/questions.length*100)}% de respuestas correctas.</p><button class="btn primary" id="retry">Volver a intentar</button><div class="review">${questions.map((q,i)=>`<p><b>${i+1}. ${q.q}</b><br>Tu respuesta: ${answers[i]===null?'Sin responder':q.a[answers[i]]}<br><span style="color:${answers[i]===q.c?'#23784b':'#a94732'}">Respuesta correcta: ${q.a[q.c]}</span><br>${q.e}</p>`).join('')}</div>`;
 document.getElementById('retry').addEventListener('click',()=>{current=0;answers=Array(questions.length).fill(null);document.querySelector('.quiz-controls').style.display='flex';render()});
}
document.getElementById('menuToggle').addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('nav').classList.remove('open')));
render();
