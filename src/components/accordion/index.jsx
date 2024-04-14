//스타일 시트, 자바스크립트 데이터를 import

/*
	./: 지금 여기
	../ : 한번 나가서
	/ : 메인경로
	/src: src폴더로 들어가서
*/
import { useState } from 'react'
import data from'./data'//이 파일 옆에 있는 data파일을 data란 키워드로 사용
import './styles.css'	 //이파일 옆에 있는 styles.css를 갖다 쓰겠다
export default function Accordion()
{
	//선택된  title의 번호를 저장할 state()

	let [selected,setSelected] = useState(null) //선택되면 setSelected를 통해서 id 넣어주기
	let [enableMultiSelection, setEnableMultiSelection] = useState(false)
	let [selectedList, setSelectedList] = useState([]);
	
	function clickTitle(id){
		console.log(id);
		
		id !== selected ? setSelected(id) :	setSelected(null);
		
	}
	// 다중 선택일때는 선택된 이들을 '모두보관' ==> 배열
	function multiSelectTitle(id){
		//배열의 값을 갱신하기 위해서는 ...으로 분해했다가 []으로 감싼다
		// 객체의 값을 갱신하기 위해서는 ...으로 분해했다가 다시 {}로 감싼다
		let copyList = [...selectedList]
	
		//index)f() : 만약 배열 안에서 id를 찾을 수 없다면 -1 , 찾으면 그위치를 )
		let findIndexOfId = selectedList.indexOf(id)
		//jsx가 아닌 js 문법이니깐 if-else
		if(findIndexOfId ===-1){
			copyList.push(id)
		
		}else{
			//있었으면 제거
			copyList.splice(findIndexOfId, 1)
		}
		setSelectedList(copyList)
		
	
	}
	
	
	return(
		<div className="wrapper">
			<button onClick={()=>{
				setEnableMultiSelection(!enableMultiSelection)
		
			}}>다중 선택ON/OFF</button>
			<div className="accordion">
				{
					data.map((element,idx)=>{
						return(
							<div className="item" key = {idx}>
							<div className="title" onClick={()=>{
								enableMultiSelection === true? multiSelectTitle(element.id):
								clickTitle(element.id)
								}}>
									<h3>{element.title}</h3>
									<span>+</span>
							</div>
							{
								enableMultiSelection  === true ? selectedList.indexOf(element.id) !== -1 && <div className='content'>{element.content}</div>:
								selected === element.id&& <div className="content">{element.content}</div>
							}
							{
								//selected 값이 id와 같은 DOM 부분만 content 새엇ㅇ
								//(selected === element.id && enableMultiSelection === false)? <div className="content">{element.content}</div>:null
							}
							
							</div> 

						)
					})
				}
				
			</div>
		</div>
		
	)

}