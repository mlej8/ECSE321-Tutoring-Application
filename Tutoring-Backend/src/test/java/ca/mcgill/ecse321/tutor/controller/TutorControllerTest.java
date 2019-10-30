package ca.mcgill.ecse321.tutor.controller;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import ca.mcgill.ecse321.tutor.dao.ManagerRepository;
import ca.mcgill.ecse321.tutor.dao.TutorRepository;
import ca.mcgill.ecse321.tutor.model.Manager;
import ca.mcgill.ecse321.tutor.service.ManagerService;

@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
public class TutorControllerTest {
	
	@Autowired
	private WebApplicationContext wac;

	@Autowired
	private TutorRepository tutorRepository;
	
	@Autowired
	private ManagerRepository managerRepository;
	
	@Autowired
	private ManagerService managerService;

	private MockMvc mockMvc;

	public void clearDatabase() {
		// this should be enough because of the composition
		tutorRepository.deleteAll();
		managerRepository.deleteAll();
	}

	@Before
	public void setup() throws Exception {
		clearDatabase();
		this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
	}
	
	@After
	public void clear() throws Exception{
		clearDatabase();
	}
	
	@Test
	public void testCreateTutor() throws Exception {
		Manager manager = managerService.createManager();
		int managerId = manager.getId();
		System.out.println(managerId);
		this.mockMvc.perform(post("/tutor")
				.param("tutorFirstName", "first1")
				.param("tutorLastName", "last2")
				.param("tutorEmail", "first.last@mail.mcgill.ca")
				.param("tutorPassword", "123456")
				.param("manager", Integer.toString(managerId))
				)
		.andExpect(status().isOk());
	}

}
