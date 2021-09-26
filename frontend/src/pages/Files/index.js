import React, { useState, useEffect } from 'react'
import { Container,Button, Form, Table } from 'react-bootstrap'
import getFiles from './../../js/Files'
import getData from './../../js/Data'
import { LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend, BarChart, Bar } from 'recharts';

import $ from 'jquery'
import "./index.css"

function Files(){
    const [arquivos,setArquivos] = useState([])
    const [data,setData] = useState({classes:[]})
    const [frequenciaRelativa,setFrequenciaRelativa] = useState([])
    const [frequenciaRelativaAcumulada,setFrequenciaRelativaAcumulada] = useState([])
    const [frequenciaAbsoluta,setFrequenciaAbsoluta] = useState([])
    const [frequenciaAbsolutaAcumulada,setFrequenciaAbsolutaAcumulada] = useState([])


    const [showTable,setShowTable] = useState(false)


    async function loadFiles(){
        await getFiles().then((res)=>{
            setArquivos(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    async function loadData(e){
        e.preventDefault()
        let nome_arquivo = $("#select-arquivo option:selected").val();
        await getData(nome_arquivo).then((res)=>{
            $("#tabela").css("display","table")
            let frequencia_relativa = []
            let frequencia_relativa_acumulada = []
            let frequencia_absoluta = []
            let frequencia_absoluta_acumulada = []

            res.data.classes.forEach((classe,index) => {
                frequencia_relativa.push({classe: `classe ${index}`, frequencia_relativa: classe[3][0] })
                frequencia_relativa_acumulada.push({classe: `classe ${index}`, frequencia_relativa_acumulada: classe[3][1] })
                frequencia_absoluta.push({classe: `classe ${index}`, frequencia_absoluta: classe[2][0] })
                frequencia_absoluta_acumulada.push({classe: `classe ${index}`, frequencia_absoluta_acumulada: classe[2][1] })

            })
            setFrequenciaRelativa(frequencia_relativa)
            setFrequenciaRelativaAcumulada(frequencia_relativa_acumulada)
            setFrequenciaAbsoluta(frequencia_absoluta)
            setFrequenciaAbsolutaAcumulada(frequencia_absoluta_acumulada)

            setData(res.data)
            setShowTable(true)
            
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(() => {
        loadFiles()
    },[])
    return (
        <Container id="files">
            <Form onSubmit={loadData}>
                <Form.Select id="select-arquivo" aria-label="">
                    {arquivos.map((arquivo, index) => ( 
                        <option value={arquivo.nome}>{arquivo.nome}</option>
                    ))}
                </Form.Select> <br />
                <Button type="submit">Consultar</Button>
            </Form>
            <br />
            {showTable &&
                <div>
                    <h5 className="propriedades"><span>Intervalo de classes:</span> {data.intervalo_classes}</h5>
                    <h5 className="propriedades"><span>Amplitude Total:</span> {data.amplitude_total}</h5>
                    <h5 className="propriedades"><span>Mediana:</span> {data.mediana}</h5>
                    <br />
                    <Table id="tabela" striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th id="th-classe">Classe</th>
                            <th>Frequência absoluta</th>
                            <th>Frequência relativa</th>
                            <th>Frequência absoluta acumulada</th>
                            <th>Frequência relativa acumulada</th>
                          </tr>
                        </thead>
                        <tbody>
                            {data.classes.map((classe, index) => ( 
                                <tr>
                                    <td>{index}</td>
                                    <td>{classe[0]}---{classe[1]}</td>
                                    <td>{classe[2][0]}</td>
                                    <td>{classe[3][0]}%</td>
                                    <td>{classe[2][1]}</td>
                                    <td>{classe[3][1]}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <br />
                    <center>
                        <div id="chart-div">
                            <BarChart width={730} height={250} data={frequenciaAbsoluta}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="classe" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="frequencia_absoluta" fill="#8884d8" />
                            </BarChart>
                            <br />
                            <BarChart width={730} height={250} data={frequenciaAbsolutaAcumulada}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="classe" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="frequencia_absoluta_acumulada" fill="#8884d8" />
                            </BarChart>
                            <br />
                            <LineChart width={600} height={300} data={frequenciaRelativa} margin={{top: 5, right: 30, left: 20, bottom: 5}} >
                                <Line type='monotone' dataKey='frequencia_relativa' stroke='#8884d8' activeDot={{r: 8}} />
                                <CartesianGrid strokeDasharray='3 3'/>
                                <Tooltip/>
                                <YAxis/>
                                <XAxis dataKey='classe'/>
                                <Legend />
                            </LineChart>
                            <br />
                            <LineChart width={600} height={300} data={frequenciaRelativaAcumulada} margin={{top: 5, right: 30, left: 20, bottom: 5}} >
                                <Line type='monotone' dataKey='frequencia_relativa_acumulada' stroke='#8884d8' activeDot={{r: 8}} />
                                <CartesianGrid strokeDasharray='3 3'/>
                                <Tooltip/>
                                <YAxis/>
                                <XAxis dataKey='classe'/>
                                <Legend />
                            </LineChart>
                        </div>
                    </center>
                </div>

            }
            
        </Container>
    )
}

export default Files;
