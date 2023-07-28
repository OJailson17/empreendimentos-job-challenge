// const handleCreateEnterprise = async () => {
//   const enterprise: Enterprise = {
//     id: 'PA04',
//     name: 'enterprise test',
//     address: {
//       city: 'city',
//       street: 'street',
//       district: 'utinga',
//       state: 'bahia',
//       number: '12',
//       cep: '47901212',
//     },
//     purpose: 'HOME',
//     status: 'RELEASE',
//   };

//   try {
//     const createEnterpriseResponse = await api.post(
//       '/enterprises',
//       enterprise,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     console.log(createEnterpriseResponse.data);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const handleDeleteEnterprise = async () => {
//   try {
//     const deleteEnterpriseResponse = await api.delete(
//       `/enterprises/${enterprise.id}`,
//     );
//     console.log(deleteEnterpriseResponse.data);
//   } catch (error) {
//     console.log({ error });
//   }
// };

// const handleUpdateEnterprise = async () => {
//   const updatedEnterprise: Enterprise = {
//     id: 'PA04',
//     name: 'Novo teste',
//     address: {
//       city: 'cidade',
//       street: 'rua',
//       district: 'utinga',
//       state: 'bahia',
//       number: '12',
//       cep: '47901212',
//     },
//     purpose: 'HOME',
//     status: 'RELEASE',
//   };

//   try {
//     const updateEnterpriseResponse = await api.put(
//       `/enterprises/${enterprise.id}`,
//       updatedEnterprise,
//       {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     console.log(updateEnterpriseResponse.data);
//   } catch (error) {
//     console.log({ error });
//   }
// };
