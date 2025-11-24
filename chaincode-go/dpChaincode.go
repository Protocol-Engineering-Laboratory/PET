package main

import (
    "encoding/json"
    "fmt"
    "github.com/hyperledger/fabric-contract-api-go/contractapi"
)

type SmartContract struct {
    contractapi.Contract
}

// 데이터를 생성하여 원장에 저장
func (s *SmartContract) CreateData(ctx contractapi.TransactionContextInterface, id string, ip string, data string) error {
    newData := map[string]string{
        "id":   id,
        "ip":   ip,
        "data": data,
    }

    // 데이터를 JSON으로 변환 후 원장에 저장
    newDataJSON, err := json.Marshal(newData)
    if err != nil {
        return fmt.Errorf("Failed to marshal data: %v", err)
    }

    return ctx.GetStub().PutState(id, newDataJSON)
}

// 데이터를 조회
func (s *SmartContract) QueryData(ctx contractapi.TransactionContextInterface, id string) (string, error) {
    dataJSON, err := ctx.GetStub().GetState(id)
    if err != nil {
        return "", fmt.Errorf("Failed to read data from world state: %v", err)
    }
    if dataJSON == nil {
        return "", fmt.Errorf("The data %s does not exist", id)
    }

    return string(dataJSON), nil
}

// 체인코드 실행
func main() {
    chaincode, err := contractapi.NewChaincode(&SmartContract{})
    if err != nil {
        fmt.Printf("Error creating chaincode: %s", err.Error())
        return
    }

    if err := chaincode.Start(); err != nil {
        fmt.Printf("Error starting chaincode: %s", err.Error())
    }
}
