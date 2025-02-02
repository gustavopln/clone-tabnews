function status(request, response) {
  response.status(200).json({ curso: "Sou aluno do curso.dev." });
}

export default status;
